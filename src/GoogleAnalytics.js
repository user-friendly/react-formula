
const TAG_ID = import.meta.env.VITE_GA_ID

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
	
	gtag('js', new Date())
	gtag('config', TAG_ID)
	
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

const GoogleAnalytics = {
	load: load,
	consentToAnalytics: () => {
		gtag('consent', 'update', {
			'analytics_storage': 'granted'
		})
	},
}

export default GoogleAnalytics
