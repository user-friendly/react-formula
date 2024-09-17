/**
 * Screen Size Debug panel
 */

import _ from 'lodash'

import { useState } from 'react'

let render = true

if (_.isUndefined(window)) {
	console.warn('ScreenSizeDebug: Window object not found.')
	render = false
}

const ScreenSizeDebug = () => {
	if (render) {
		const [dim, setDim] = useState({ w: window.innerWidth, h: window.innerHeight })
		
		window.onresize = (e) => {
			setDim({ w: window.innerWidth, h: window.innerHeight })
		}
		
		return <div className="
			p-1
			absolute top-0 left-0
			rounded-md
			text-xs text-gray-400 bg-gray-100
		">
			{dim.w}x{dim.h}
		</div>
	} else {
		return <></>
	}
}

export default ScreenSizeDebug
