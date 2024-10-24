
//
// Dynamically generated routes.
//

import {default as React, lazy} from 'react'

import {Routes, Route} from 'react-router-dom'

import RouterPathMap from 'RouterPathMap'

const RouteMap = ({index, notfound}) => {
	let Component = lazy(() => import('/src/Page/About'))
	
	const routes = RouterPathMap.map((r, k) => {
		Component = lazy(() => import(/* @vite-ignore */ r.srcPath))
		return <Route key={k} path={r.path} element={<Component />} />
	})
	
	return <Routes>
		{routes}
		
		<Route path="/" element={index} />
		<Route path="/home" element={index} />
		<Route path="*" element={notfound} />
	</Routes>
}

export {RouterPathMap}
export default RouteMap
