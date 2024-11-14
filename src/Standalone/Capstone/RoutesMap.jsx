
import {Routes, Route, Navigate, Outlet, useLocation} from 'react-router-dom'

import NotFound from '#cap/Pages/NotFound'
import Home from '#cap/Pages/Home'
import StyleGuide from '#cap/Pages/StyleGuide'
import SignInPage from '#cap/Pages/Auth/SignInPage'
import SignUpPage from '#cap/Pages/Auth/SignUpPage'
import PlantList from '#cap/Pages/PlantList'
import PlantShow from '#cap/Pages/PlantShow'

import SessionContext from '#cap/Context/Session'
import {ApiGetPlant} from  '#cap/Services'
import {useContext, useCallback} from 'react'

const ExampleLayout = () => {
	return <>
		<Outlet />
	</>
}

const RoutesMap = () => {
	const loc = useLocation()
	const session = useContext(SessionContext)
	
	return <Routes>
		<Route element={<ExampleLayout />}>
			<Route path="/" element={<Home />} />
			<Route path="/sign-in" element={<SignInPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			
			<Route path="/style-guide" element={<StyleGuide />} />
			
			<Route path="/plants" element={<PlantList />} />
			
			<Route path="/plant/:uuid" element={<PlantShow />} />
			
			<Route path="*" element={<NotFound />} />
		</Route>
	</Routes>
}

export default RoutesMap
