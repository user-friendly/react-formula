
import {useState, useEffect} from 'react'

import {useLocation, useNavigate} from 'react-router'

const RouteMonitor = (props) => {
	const loc = useLocation()

	console.log('Render RouteMonitor.')
	
	useEffect(() => {
		console.log('route changed:', loc.pathname)
	}, [loc])
	
	return <>{props.children}</>
}

export default RouteMonitor
