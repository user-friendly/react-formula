
import _ from 'lodash'
import clsx from 'clsx'

import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {RequireSession} from '#cap/Components/AccessControl'
import SessionContext from '#cap/Context/Session'

import {ShowCartModal} from '#cap/Components/Cart'

import Icon from '#cap/Components/Icon'

const baseLinkStyle = `py-2 px-1 font-lato font-medium hover:text-emerald-200 active:translate-y-0.5`

const linkStyle = `${baseLinkStyle} hover:underline`

// TODO Might want to change the default icon style to match this one.
const iconStyle = `
	bg-transparent text-white
	hover:bg-emerald-700 group-hover:bg-emerald-700 active:bg-emerald-600 group-active:bg-emerald-600
`
const iconProgressStyle = `${iconStyle} rounded-full animate-spin`

const linkButtonStyle = `${baseLinkStyle} relative group flex justify-end items-center`
const linkButtonTextStyle = `hidden md:inline px-1 group-hover:underline`
const linkButtonIconStyle = `${iconStyle}`

const linkButtonTextHamStyle = `text-white px-1 group-hover:underline`

const Links = ({isHam = false}) => {
	const navigate = useNavigate()
	const session = useContext(SessionContext)
	const [signingOut, setSigningOut] = useState(false)
	
	const linkTextStyle = isHam ? linkButtonTextHamStyle : linkButtonTextStyle
	
	const handleSignOut = async (e) => {
		e.stopPropagation()
		if (signingOut) {
			return
		}
		setSigningOut(true)
		if (await session.signOut()) {
			navigate('/')
		}
		// 2 sec delay
		//await (new Promise((r) => setTimeout(() => r(), 2500)).then((r) => r))
		setSigningOut(false)
	}
	
	const handleShowCart = (e) => {
		e.preventDefault()
		ShowCartModal()
	}
	
	return <>
		<RequireSession>
			<Link className={linkButtonStyle} to="/plants">
				<span className={linkTextStyle}>Plant List</span>
				<Icon name="potted_plant" className={linkButtonIconStyle} />
			</Link>
			
			<Link className={linkButtonStyle}>
				<span className={linkTextStyle}>{_.get(session, 'data.username')}</span>
				<Icon name="account_circle" className={linkButtonIconStyle} />
			</Link>
			
			<Link className={linkButtonStyle} to="/cart" onClick={handleShowCart}>
				<span className={linkTextStyle}>Cart</span>
				<Icon className={linkButtonIconStyle} name="shopping_cart" />
			</Link>
			
			<Link className={linkButtonStyle} onClick={handleSignOut}>
				<span className={linkTextStyle}>
					Sign Out
				</span>
				{signingOut && <Icon name="progress_activity" className={iconProgressStyle} /> || <Icon name="logout" className={iconStyle} />}
			</Link>
		</RequireSession>
		
		<RequireSession not>
			<Link className={linkButtonStyle} to="/sign-in">
				<span className={linkTextStyle}>
					Sign In
				</span>
				<Icon name="login" className={iconStyle}/>
			</Link>
		</RequireSession>
	</>
}

export default Links
