import {default as MswBrowser} from '/msw/src/Browser'

import {StrictMode, Suspense, lazy} from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {default as MainApp} from './App'

import Spinner from '#Components/Spinner'
import ScreenSizeDebug from './ScreenSizeDebug'

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

const standaloneApps = [
	// There's an index component in the main app too, set by RouterMap.
	{path: '/', Component: lazy(() => import('#Standalone/Capstone/App'))},
	
	{path: '/standalone/capstone/*', Component: lazy(() => import('#Standalone/Capstone/App'))},
	{path: '/standalone/mobile', Component: lazy(() => import('#Standalone/MobileResponsiveDesign/App'))},
	{path: '/standalone/graphics', Component: lazy(() => import('#Standalone/Graphics'))},
]

const AppWrapper = () => {
	console.debug('Render AppWrapper.')
	
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
