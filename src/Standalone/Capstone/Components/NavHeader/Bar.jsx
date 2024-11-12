
import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import clsx from 'clsx'

import SessionContext from '#cap/Context/Session'

import Icon from '#cap/Components/Icon'

import Links from './Links'

const linkStyle = `p-2 font-lato font-medium hover:text-emerald-200 hover:underline active:translate-y-0.5`
const linkIconStyle = `mx-1`

// TODO Might want to change the default icon style to match this one.
const iconStyle = `bg-transparent text-white hover:bg-emerald-700 active:bg-emerald-600`
const iconProgressStyle = `${iconStyle} rounded-full animate-spin`

const spinnerStyle = `ml-1 w-4 h-4 inline-block
	border-transparent border-t-white group-hover:border-t-emerald-200
`

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
	
	const signOutButton = <Link onClick={handleSignOut} className={linkIconStyle + ' relative group'}>
		{signingOut && <Icon name="progress_activity" className={iconProgressStyle} /> || <Icon name="logout" className={iconStyle} />}
	</Link>
	
	return <div className="hidden sm:flex justify-center bg-emerald-800">
		<div className="w-full max-w-5xl flex p-8 justify-end items-center text-white">
			<div className="flex-1">
				<Link to="/" className="flex justify-start items-center">
					<img className="w-10" title="brand logo"
						src="https://static-task-assets.react-formula.com/capstone_logo_light.png" />
					<span className="ml-8 font-playfair text-2xl">Rica's Plants</span>
				</Link>
			</div>	
			
			<Links linkstyle={linkStyle} />
			
			{session.isActive() && signOutButton}
			{!session.isActive() && <Link className={linkIconStyle} to="/sign-in"><Icon name="login" className={iconStyle}/></Link>}
		</div>
	</div>
}

export default Bar
