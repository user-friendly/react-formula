
import {Link, useNavigate} from 'react-router-dom'
import {RequireSession} from '#cap/Components/AccessControl'

const Links = ({linkstyle}) => {
	return <RequireSession>
		<Link className={linkstyle} to="/plants">Plant List</Link>
	</RequireSession>
}

export default Links
