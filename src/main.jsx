import {default as MswBrowser} from '/msw/src/Browser'

import {StrictMode, Suspense, useEffect, useState, lazy} from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

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

const getPathname = () => {
	if (window !== undefined && window.location !== undefined) {
		return window.location.pathname
	}
	throw 'Could not get pathname.'
}

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

const createContextValue = (appId = 'main', onNotFound) => {
	if (onNotFound === undefined) {
		onNotFound = (path, appId) => {
			console.log(`App {${appId}} reports path {${path}} was not found.`)
		}			
	}
	return {
		appId: appId,
		onNotFound: onNotFound
	}
}

const AppWrapper = () => {
	console.debug('Render AppWrapper.')
	
	const [currentApp, setCurrentApp] = useState('default')
	// Set MainApp as default app.
	let App = standaloneApps.find(app => app.id === 'default').Component
	
	// Detect app switches based on current pathname. The current pathname should
	// contain the path (which is basepath) of the app.
	const requestedApp = standaloneApps.find(app => {
		// Skip current app - basepath will alwasy match.
		// Skip default app - basepath should always match all paths.
		if (app.id === currentApp || app.id === 'default') {
			return false
		}
		return getPathname().startsWith(app.path)
	})
	if (requestedApp !== undefined) {
		setCurrentApp(requestedApp.id)
	}
	// Get app component, finally.
	App = standaloneApps.find(app => app.id === currentApp).Component

	const contextValue = createContextValue(currentApp)
	
	return <StrictMode>
		<Suspense fallback={
			<div className="fixed inset-0 w-secreen h-screen flex justify-center items-center">
				<Spinner dim="w-40 h-40" borderWidth="border-[2.5rem]" borderColor="border-gray-700" />
			</div>
		}>
			<AppWrapperContext.Provider value={contextValue}>
				<App />
			</AppWrapperContext.Provider>
		</Suspense>
	</StrictMode>
	
	return <StrictMode>
		<BrowserRouter>
			<Suspense fallback={
				<div className="fixed inset-0 w-secreen h-screen flex justify-center items-center">
					<Spinner dim="w-40 h-40" borderWidth="border-[2.5rem]" borderColor="border-gray-700" />
				</div>
			}>
				<Routes>
					{standaloneApps.map((app, k) => <Route path={app.path} Component={app.Component} key={k} />)}
					<Route path="*" element={<MainApp />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</StrictMode>
}

const onPathChange = () => {
    console.log('Path changed to:', window.location.pathname);
}

// Listen for popstate events
window.addEventListener('popstate', onPathChange)
window.addEventListener('pushstate', onPathChange)

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
