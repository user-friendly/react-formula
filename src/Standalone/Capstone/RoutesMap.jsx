
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'

import NotFound from '#cap/Pages/NotFound'
import StyleGuide from '#cap/Pages/StyleGuide'

const RoutesMap = () => {
	const loc = useLocation()
	
	return <>
	{/*loc.pathname === '/' ? <Navigate to="/standalone/capstone/style-guide" /> : null*/}
	<Routes>
		<Route path="style-guide" element={<StyleGuide />} />
		<Route path="/" element={<StyleGuide />} />
		<Route path="*" element={<NotFound />} />
	</Routes></>
}

export default RoutesMap
