
import {Link, useNavigate} from 'react-router-dom'

const Links = ({linkstyle}) => {
	return <>
		<Link className={linkstyle} to="/plants">Plant List</Link>
	</>
}

export default Links
