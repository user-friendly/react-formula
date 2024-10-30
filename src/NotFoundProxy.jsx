
import {useContext} from 'react'
import {useLocation} from 'react-router-dom'

import AppWrapperContext from '#AppWrapperContext'

const NotFoundProxy = ({fallback}) => {
	const loc = useLocation()
	const ctx = useContext(AppWrapperContext)
	
	console.log('Route {', loc.pathname, '} not found in current app.')
	if (ctx.onNotFound !== undefined) {
		ctx.onNotFound(loc.pathname, ctx.appId)
	}
	
	return <>{fallback}</>
}

export default NotFoundProxy
