
import {Link} from 'react-router-dom'

import AppSwitcher from '#AppSwitcher'

import Icon from '#cap/Icon'

const linkStyle = `
	mx-1 py-2 px-3 bg-sky-200 rounded-lg
	font-lato font-medium text-sky-800 hover:text-sky-300 hover:bg-sky-600
`

const NavBar = () => {
	return <div>
		<div className="my-3 flex justify-center">
			<AppSwitcher className={linkStyle} appid="default">Main App</AppSwitcher>
			<Link className={linkStyle} to="/">Rica's Plants</Link>
			<Link className={linkStyle} to="/sing-in">Sign In</Link>
			<Link className={linkStyle} to="/style-guide">Style Guide</Link>
		</div>
	</div>
}

export default NavBar
