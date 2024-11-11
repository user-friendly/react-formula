
import {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import SessionContext from '#cap/Context/Session'

// Milliseconds default delay, or false.
const DEFAULT_DELAY = false

const RedirectAuthenticated = (props) => {
	const session = useContext(SessionContext)
	const navigate = useNavigate()
	const path = props.path !== undefined ? props.path : '/'
	const delay = props.delay !== undefined ? props.delay : DEFAULT_DELAY
	
	useEffect(() => {
		if (session.isActive() === !props.not) {
			if (delay !== false) {
				const tid = setTimeout(() => navigate(path), delay)
				return () => clearTimeout(tid)
			} else {
				navigate(path)
			}
		}
	}, [session.data])
	
	return props.children
}

export default RedirectAuthenticated
