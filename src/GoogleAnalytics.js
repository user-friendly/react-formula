
const TAG_ID = import.meta.env.VITE_GA_ID

if (window.dataLayer === undefined && window.gtag === undefined) {
	console.log('Setup Google Analytics.')
	
	// Define dataLayer and the gtag function.
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	window.gtag = gtag
	
	gtag('js', new Date());
	gtag('config', TAG_ID);
	
	// Set default consent to 'denied' as a placeholder
	// Determine actual values based on your own requirements
	gtag('consent', 'default', {
		'ad_storage': 'denied',
		'ad_user_data': 'denied',
		'ad_personalization': 'denied',
		'analytics_storage': 'denied'
	});
	
	const script = document.createElement('script')
	script.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`
	script.async = true
	script.onload = (...args) => {
		console.log('Loaded GA script.', args)
	}
	script.onerror = () => {
		console.error('Failed to load GA script.')
	}
	document.head.appendChild(script)
}

const GoogleAnalytics = {
	consentGrantedAdStorage: () => {
		gtag('consent', 'update', {
			'ad_storage': 'granted'
		})
	}
}

export default GoogleAnalytics
