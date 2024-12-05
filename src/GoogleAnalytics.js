
const TAG_ID = import.meta.env.VITE_GA_ID

const GA_DEBUG_MODE = import.meta.env.VITE_GA_DEBUG_MODE === 'true' ? true : false

// Boolean true is converted to GA consent status:
const consentStatusYes = 'granted'
// Boolean false is converted to GA consent status:
const consentStatusNo = 'denied'

const defaultConsentOptions = {
	'ad_storage':				false,
	'ad_user_data':				false,
	'ad_personalization':		false,
	'analytics_storage':		false,
	'functionality_storage':	false,
	'personalization_storage':	false,
	'security_storage':			false,
}

const init = () => {
	// Define dataLayer and the gtag function.
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	window.gtag = gtag
}
init()

const load = (consent = {}) => {
	if (window.GAInitDone) {
		return
	}
	console.log('Setup Google Analytics.')
	
	if (typeof consent !== 'object') {
		consent = {}
	}
	
	const consentOptions = defaultConsentOptions
	// Override defaults.
	for (const type in consent) {
		if (typeof consent[type] === 'boolean'
			&& consentOptions[type] !== undefined
			&& consent[type] !== consentOptions[type]
		) {
			consentOptions[type] = consent[type]
		}
	}
	// Convert booleans to GA consent status.
	for (const type in consentOptions) {
		consentOptions[type] = consentOptions[type] === true ? consentStatusYes : consentStatusNo
	}
	
	const webStreamConfig  = {
		send_page_view: true,
	}
	if (GA_DEBUG_MODE) {
		webStreamConfig.debug_mode = true
	}
	
	gtag('js', new Date())
	gtag('config', TAG_ID, webStreamConfig)
	
	gtag('consent', 'default', consentOptions)
	
	const script = document.createElement('script')
	script.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`
	script.async = true
	script.onload = (...args) => {
		window.GAInitDone = true
	}
	script.onerror = () => {
		window.GAInitDone = false
		delete window.dataLayer
		init()
	}
	document.head.appendChild(script)
}

const consentToAnalytics = () => {
	gtag('consent', 'update', {
		'analytics_storage': 'granted'
	})
}

const event = (name, params) => {
	if (gtag === undefined) {
		return
	}
	
	gtag('event', name, params)
}

const pageView = (title, location) => {
	event('page_view', {
		page_title: title,
		page_location: location
	})
}

// Custom events follow.

const screenView = (app_name, screen_name) => {
	event('screen_view', {
		app_name: app_name,
		screen_name: screen_name,
	})
}

const appLoad = (app_name) => {
	event('app_load', {
		app_name: app_name,
	})
}

const GoogleAnalytics = {
	load: load,
	
	consentToAnalytics: consentToAnalytics,
	
	event: event,

	appLoad: appLoad,
	pageView: pageView,
	screenView: screenView,
}

export default GoogleAnalytics
