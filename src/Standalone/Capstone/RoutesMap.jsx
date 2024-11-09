
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'

import NotFound from '#cap/Pages/NotFound'
import StyleGuide from '#cap/Pages/StyleGuide'
import SignInPage from '#cap/Pages/Auth/SignInPage'
import SignUpPage from '#cap/Pages/Auth/SignUpPage'

const RoutesMap = () => {
	const loc = useLocation()
	
	return <Routes>
		<Route path="/" element={<SignInPage />} />
		<Route path="/sign-in" element={<SignInPage />} />
		<Route path="/sign-up" element={<SignUpPage />} />
		<Route path="/style-guide" element={<StyleGuide />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
}

export default RoutesMap
