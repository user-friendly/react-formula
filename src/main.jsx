import _ from 'lodash'

import {default as MswBrowser} from '/msw/src/Browser'

import {StrictMode, Suspense, useEffect, useState, lazy} from 'react'
import ReactDOM from 'react-dom/client'

import {Routes, Route} from 'react-router-dom'

import {default as MainApp} from './App'

import Spinner from '#Components/Spinner'
import ScreenSizeDebug from './ScreenSizeDebug'

import AppWrapperContext from '#AppWrapperContext'

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
})()

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

const getSessionAppId = () => {
	// Currently, the only supported platform is web.
	if (document === undefined) {
		return false
	}
	
	if (document.cookie === undefined || !document.cookie.trim().length) {
		return false
	}
	
	const cookies = _.fromPairs(document.cookie.split(';').map((c) => c.split('=')))
	
	// TODO Cookie security? Can code be injected into cookie values?
	
	return cookies.currentApp !== undefined ? cookies.currentApp : false
}

const setSessionAppId = (appId) => {
	// Currently, the only supported platform is web.
	if (document === undefined) {
		return false
	}
	
	const domain = window.location.host.split('.').splice(-2).join('.')
	const path = '/'
	const expires = (new Date(Date.now() + 30 * 86400000)).toUTCString()
	document.cookie = `currentApp=${appId}; Domain=${domain}; Path=${path}; Expires=${expires};`
	
	return true
}

const getDefaultCurrentApp = () => {
	// Currently, the only supported platform is web.
	if (document === undefined) {
		return 'default'
	}
	
	const stateDefault = getSessionAppId()
	if (!stateDefault) {
		setSessionAppId('default')
		return 'default'
	}
	return stateDefault
}

const AppWrapper = () => {
	const [currentApp, setCurrentApp] = useState(getDefaultCurrentApp())
	const contextValue = createContextValue(currentApp)
	let App = standaloneApps.find(app => currentApp === app.id)
	
	console.debug('Render AppWrapper.')
	
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
		setSessionAppId(appId)
		setCurrentApp(appId)
	}
	
	return <StrictMode>
		<Suspense fallback={
			<div className="fixed inset-0 w-secreen h-screen flex justify-center items-center">
				<Spinner dim="w-40 h-40" borderWidth="border-[2.5rem]" borderColor="border-gray-700" />
			</div>
		}>
			<AppWrapperContext.Provider value={contextValue}>
				<App.Component />
			</AppWrapperContext.Provider>
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

ReactDOM.createRoot(document.getElementById('screenSizeDebug')).render(
	<ScreenSizeDebug />
)
