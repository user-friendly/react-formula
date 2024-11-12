
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'

import NotFound from '#cap/Pages/NotFound'
import Home from '#cap/Pages/Home'
import StyleGuide from '#cap/Pages/StyleGuide'
import SignInPage from '#cap/Pages/Auth/SignInPage'
import SignUpPage from '#cap/Pages/Auth/SignUpPage'
import PlantList from '#cap/Pages/PlantList'

const RoutesMap = () => {
	const loc = useLocation()
	
	return <Routes>
		<Route path="/" element={<Home />} />
		<Route path="/sign-in" element={<SignInPage />} />
		<Route path="/sign-up" element={<SignUpPage />} />
		
		<Route path="/style-guide" element={<StyleGuide />} />
		
		<Route path="/plants" element={<PlantList />} />
		
		<Route path="*" element={<NotFound />} />
	</Routes>
}

export default RoutesMap
