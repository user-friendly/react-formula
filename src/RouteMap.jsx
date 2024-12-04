/**
 * TODO Write some help about the map.
 * Include docs about the Vite/Rollup plugin.
 */

import {lazy, useEffect} from 'react'

import {Routes, Route, useLocation} from 'react-router'

import RouterPathMap from 'RouterPathMap'

// Yup, had this in the render function... lost a couple of hours and
// was about to give up (undid some refactoring), until a console.log
// saved the day. For some reason, the RouteMap render function kept
// getting called to infinity. Navigating to the home or not found
// fixes the runtime issue. Would really like to know why that happens.
// Perhaps something with states behind the Router's scene.
const routes = RouterPathMap.map((r, k) => 
	<Route key={k} path={r.path} Component={r.component} />
)

const getTitleByPath = (path) => {
	const mapObj = RouterPathMap.find((r) => r.path === path)
	return mapObj?.title !== undefined ? mapObj.title : false 
}

const RouteMap = ({home, notfound}) => {
	const loc = useLocation()
	
	useEffect(() => {
		const title = getTitleByPath(loc.pathname)
		if (title) {
			document.title = title
		} // TODO Report to GA?
	}, [loc])
	
	return <Routes>
		{routes}
		
		{home !== undefined ? (<>
			<Route path="/" element={home} />
			<Route path="/home" element={home} />
		</>) : null}
		
		{notfound !== undefined ? (<>
			<Route path="*" element={notfound} />
		</>) : null}
	</Routes>
}

export {RouterPathMap}
export default RouteMap
