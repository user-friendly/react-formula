
import {useContext} from 'react'
import SessionContext from '#cap/Context/Session'

/**
 * Render only if an active session is present.
 */
const RequireSession = (props) => {
	const session = useContext(SessionContext)
	return session.isActive() === !props.not ? props.children : null
}

export default RequireSession
