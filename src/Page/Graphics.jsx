/**
 * Graphics page view.
 */

import _ from 'lodash'

import {useState, useEffect} from 'react'

import Router from '#Router'

export const PAGE_TITLE = 'Graphics Experimentation'

const Graphics = () => {
	// const [list, setList] = useState(new Map())
	
	/*useEffect(() => {
		// Refresh list, or something.
	}, [list])*/

	return (<>
		<h2 className="m-4 text-4xl text-center">{PAGE_TITLE}</h2>
		<div className="m-auto flex flex-col items-center">
			[Canvas Here]
		</div>
	</>)
}

Router.setRoute('/graphics', <Graphics />, PAGE_TITLE)

export default Graphics
