import {default as MswBrowser} from '/msw/src/Browser'

import StrictMode from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
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

// FIXME Mocking lesson services, since I aint got the monies
//		 to get a ☁ VM.
if (true /*import.meta.env.DEV === true*/) {
	MswBrowser.start({onUnhandledRequest: 'bypass'}).then(() => {
		ReactDOM.createRoot(document.getElementById('root')).render(<App />)
	})
} else {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<StrictMode>
			<App />
		</StrictMode>
	)
}

ReactDOM.createRoot(document.getElementById('screenSizeDebug')).render(
	<ScreenSizeDebug />
)
