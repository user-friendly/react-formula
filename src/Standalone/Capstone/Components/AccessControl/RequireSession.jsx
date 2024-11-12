
import {useContext} from 'react'
import SessionContext from '#cap/Context/Session'

/**
 * Render only if an active session is present.
 */
const RequireSession = (props) => {
	const session = useContext(SessionContext)
	return (!props.not ? session.isActive() : !session.isActive()) ? props.children : null
}

export default RequireSession
