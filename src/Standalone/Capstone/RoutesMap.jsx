
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'

import NotFound from '#cap/Pages/NotFound'
import StyleGuide from '#cap/Pages/StyleGuide'
import SignInPage from '#cap/Pages/Auth/SignInPage'

const RoutesMap = () => {
	const loc = useLocation()
	
	return <Routes>
		<Route path="/" element={<SignInPage />} />
		<Route path="/style-guide" element={<StyleGuide />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
}

export default RoutesMap
