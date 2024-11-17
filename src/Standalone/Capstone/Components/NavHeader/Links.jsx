
import {Link, useNavigate} from 'react-router-dom'

import {RequireSession} from '#cap/Components/AccessControl'

import Icon from '#cap/Components/Icon'

const iconStyle = `
	bg-transparent text-white
	hover:bg-emerald-700 group-hover:bg-emerald-700 active:bg-emerald-600 group-active:bg-emerald-600
`

const linkHasIconStyle = `group hover:no-underline flex items-center`
const linkHasIconTextStyle = `mr-1 group-hover:underline`

const Links = ({linkstyle}) => {
	// Horrible naming.
	const linkStyle = linkstyle + ' ' + linkHasIconStyle
	
	return <RequireSession>
		<Link className={linkstyle} to="/plants">Plant List</Link>
		<Link className={linkStyle} to="/cart">
			<span className={linkHasIconTextStyle}>Cart</span><Icon className={iconStyle} name="shopping_cart" />
		</Link>
	</RequireSession>
}

export default Links
