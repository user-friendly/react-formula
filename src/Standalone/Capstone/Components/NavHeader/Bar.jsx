
import _ from 'lodash'

import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import clsx from 'clsx'

import {RequireSession} from '#cap/Components/AccessControl'
import Icon from '#cap/Components/Icon'

import SessionContext from '#cap/Context/Session'

import Links from './Links'

const baseLinkStyle = `py-2 px-1 font-lato font-medium hover:text-emerald-200 active:translate-y-0.5`

const linkStyle = `${baseLinkStyle} hover:underline`

// TODO Might want to change the default icon style to match this one.
const iconStyle = `
	bg-transparent text-white
	hover:bg-emerald-700 group-hover:bg-emerald-700 active:bg-emerald-600 group-active:bg-emerald-600
`
const iconProgressStyle = `${iconStyle} rounded-full animate-spin`

const linkButtonStyle = `${baseLinkStyle} relative group flex items-center`
const linkButtonTextStyle = `hidden md:inline px-1 group-hover:underline`
const linkButtonIconStyle = `${iconStyle}`

const Bar = () => {
	const navigate = useNavigate()
	const session = useContext(SessionContext)
	const [signingOut, setSigningOut] = useState(false)
	
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
	
	return <div className="hidden sm:flex justify-center bg-emerald-800">
		<div className="w-full max-w-5xl flex p-8 justify-end items-center text-white">
			<div className="flex-1 flex">
				<Link to="/" className="p-2 flex justify-start items-center">
					<img className="w-10" title="brand logo"
						src="https://static-task-assets.react-formula.com/capstone_logo_light.png" />
					<span className="ml-4 font-playfair text-2xl">Rica's Plants</span>
				</Link>
			</div>	
			
			<Links linkstyle={linkStyle} />
			
			<RequireSession>
				<Link className={linkButtonStyle}>
					<span className={linkButtonTextStyle}>
						{_.get(session, 'data.username')}
					</span>
					<Icon name="account_circle" className={linkButtonIconStyle} />
				</Link>
				
				<Link className={linkButtonStyle} to="/cart">
					<span className={linkButtonTextStyle}>Cart</span><Icon className={linkButtonIconStyle} name="shopping_cart" />
				</Link>
				
				<Link onClick={handleSignOut} className={linkButtonStyle}>
					<span className={linkButtonTextStyle}>
						Sign Out
					</span>
					{signingOut && <Icon name="progress_activity" className={iconProgressStyle} /> || <Icon name="logout" className={iconStyle} />}
				</Link>
			</RequireSession>
			
			<RequireSession not>
				<Link className={linkButtonStyle} to="/sign-in">
					<span className={linkButtonTextStyle}>
						Sign In
					</span>
					<Icon name="login" className={iconStyle}/>
				</Link>
			</RequireSession>
		</div>
	</div>
}

export default Bar
