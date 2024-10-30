
import {Link} from 'react-router-dom'

import Icon from '#cap/Icon'

const linkStyle = `
	mx-1 py-2 px-3 bg-sky-200 rounded-lg
	font-lato font-medium text-sky-800 hover:text-sky-300 hover:bg-sky-600
`

const NavBar = () => {
	return <div>
		<Icon name="menu" />
		<div className="my-3 flex justify-center">
			<Link className={linkStyle} to="/home">Main App</Link>
			<Link className={linkStyle} to="/">Rica's Plants</Link>
			<Link className={linkStyle} to="/standalone/capstone/style-guide">Style Guide</Link>
		</div>
	</div>
}

export default NavBar
