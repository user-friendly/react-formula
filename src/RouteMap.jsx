/**
 * TODO Write some help about the map.
 * Include docs about the Vite/Rollup plugin.
 */

import {lazy} from 'react'

import {Routes, Route} from 'react-router-dom'

import RouterPathMap from 'RouterPathMap'

// Yup, had this in the render function... lost a couple of hours and
// was about to give up (undid some refactoring), until a console.log
// saved the day. For some reason, the RouteMap render function kept
// getting called to infinity. Navigating to the index or not found
// fixes the runtime issue. Would really like to know why that happens.
// Perhaps something with states behind the Router's scene.
const routes = RouterPathMap.map((r, k) => 
	<Route key={k} path={r.path} Component={lazy(() => import(/* @vite-ignore*/ r.srcPath))} />
)

const RouteMap = ({index, notfound}) => {
	return <Routes>
		{routes}
		
		<Route path="/" element={index} />
		<Route path="/home" element={index} />
		<Route path="*" element={notfound} />
	</Routes>
}

export {RouterPathMap}
export default RouteMap
