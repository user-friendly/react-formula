
import GoogleAnalytics from '#GoogleAnalytics'

import _ from 'lodash'
import {default as MswBrowser} from '/msw/src/Browser'

import {StrictMode, Suspense, useEffect, useState, lazy} from 'react'
import ReactDOM from 'react-dom/client'
import {Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import {default as MainApp} from './App'
import CookieBanner from '#Components/CookieBanner'
import AppWrapperContext from '#AppWrapperContext'
import Spinner from '#Components/Spinner'

import './Style/index.css'

if (import.meta.hot) {
	import.meta.hot.on(
		'vite:beforeUpdate',
		/* eslint-disable-next-line no-console */
		() => console.clear()
	)
}

// Overrides the global console log method, to supress logging on production.
(() => {
	const original = {
		log: console.log
	}
	console.log = (...args) => {
		if (import.meta.env.PROD !== true) {
			return original.log.call(console, ...args)
		}
		return null
	}
})();

// Redirect app on init.
(() => {
	if (window === undefined || document === undefined) {
		return
	}
	
	const getDefaultRoute = () => {
		if (document === undefined || !document.referrer.length) {
			return false
		}
		const refUrl = new URL(document.referrer)
		if (refUrl.origin === window.location.origin && refUrl.pathname !== window.location.pathname) {
			// NOTE You can also use URL.search to get query params.
			return refUrl.pathname
		}
		return false
	}
	
	const initRoute = getDefaultRoute()
	if (initRoute) {
		window.history.pushState({initialRoute: true}, null, initRoute)
	}
})();

const baseDomain = window.location.host.split('.').splice(-2).join('.')

const defaultApp = import.meta.env.VITE_DEFAULT_APP !== undefined
	? import.meta.env.VITE_DEFAULT_APP
	: 'default'

// I guess this is the meta for an app?
const standaloneApps = [
	// TODO Redesign these paths. They're basically a way to switch to an app. Perhaps using paths is pointless?
	//      However, once (if?) this app is moved to a proper hosting platform, your idea of using direct function
	//		calls won't work.
	// TODO Rename path to basepath!
	// The default app MUST be set to the root web path, i.e. '/'.
	{id: 'default', path: '/', Component: MainApp},
	{id: 'capstone', path: '/standalone/capstone', Component: lazy(() => import('#Standalone/Capstone/App'))},
	{id: 'mobile', path: '/standalone/mobile', Component: lazy(() => import('#Standalone/MobileResponsiveDesign/App'))},
	{id: 'graphics', path: '/standalone/graphics', Component: lazy(() => import('#Standalone/Graphics'))},
]

const getPathname = () => {
	if (window !== undefined && window.location !== undefined) {
		return window.location.pathname
	}
	throw 'Could not get pathname.'
}

const createContextValue = (appId = 'default') => {
	return {
		appId: appId,
		switchApp: (appId) => {
			console.log(`App switch requested to {${appId}}.`)
			if (undefined === standaloneApps.find(app => app.id === appId)) {
				console.log(`Cannot switch to a non-existing app {${appId}}.`)
				return
			}
			console.log(`App switch requested to {${appId}}.`)
		}
	}
}

const AppWrapper = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['currentApp', 'cookieConsent'])
	const [currentApp, setCurrentApp] = useState(() => {
		return cookies.currentApp !== undefined
			? cookies.currentApp
			: defaultApp
	})
	const contextValue = createContextValue(currentApp)
	let App = standaloneApps.find(app => currentApp === app.id)
	
	let cookieBanner = null
	if (cookies.cookieConsent === undefined) {
		// Figure out cookies as early as possible.
		// This looks like it will be a security issue. Server side consent storage should be preferred.
		const saveConsent = (consent) => {
			const expireDate = new Date()
			expireDate.setMonth(expireDate.getMonth() + 1)
			setCookie('cookieConsent', JSON.stringify(consent), {
				domain: baseDomain,
				path: '/',
				expires: expireDate,
			})
		}
		const onCookieAccept = (e) => {
			const consentStatusYes = {
				'analytics_storage': true,
			}
			saveConsent(consentStatusYes)
		}
		const onCookieDecline = (e) => {
			const consentStatusNo = {
				'analytics_storage': false,
			}
			saveConsent(consentStatusNo)
		}
		cookieBanner = <CookieBanner onAccept={onCookieAccept} onDecline={onCookieDecline} />
	}
	
	console.log(`Current app is {${currentApp}}.`)
	if (App === undefined) {
		App = MainApp
	}
	
	contextValue.switchApp = (appId) => {
		console.log(`App switch requested to {${appId}}.`)
		if (undefined === standaloneApps.find(app => app.id === appId)) {
			console.log(`Cannot switch to a non-existing app {${appId}}.`)
			return
		}
		// Handle web platform specifics.
		if (window !== undefined && window.history !== undefined) {
			// Set browser routing to root.
			window.history.pushState({previousApp: currentApp}, null, '/')
		}
		// Remember choice, using platform specific storage.
		// For web, this will be cookies.
		const expireDate = new Date()
		expireDate.setMonth(expireDate.getMonth() + 1)
		setCookie('currentApp', appId, {
			domain: baseDomain,
			path: '/',
			expires: expireDate,
		})
		setCurrentApp(appId)
	}
	
	const bigSpinner = <div className="fixed inset-0 w-secreen h-screen flex justify-center items-center">
		<Spinner dim="w-40 h-40" borderWidth="border-[2.5rem]" borderColor="border-gray-700" />
	</div>
	
	return <StrictMode>
		<Suspense fallback={bigSpinner}>
			<AppWrapperContext.Provider value={contextValue}>
				<App.Component />
			</AppWrapperContext.Provider>
			{cookieBanner}
		</Suspense>
	</StrictMode>
}

// FIXME Mocking lesson services, since I aint got the monies
//		 to get a ☁ VM.
if (true /*import.meta.env.DEV === true*/) {
	MswBrowser.start({onUnhandledRequest: 'bypass'}).then(() => {
		ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />)
	})
} else {
	ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />)
}
