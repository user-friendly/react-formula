
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'

import NotFound from '#cap/Pages/NotFound'
import StyleGuide from '#cap/Pages/StyleGuide'

const RoutesMap = () => {
	const loc = useLocation()
	
	return <>

	{loc.pathname === '/' ? <StyleGuide /> : <NotFound /> }
	<Routes>
		<Route path="./style-guide" element={<StyleGuide />} />
		<Route path="./" element={<NotFound />} />
		<Route path="./*" element={<NotFound />} />
	</Routes></>
}

export default RoutesMap
