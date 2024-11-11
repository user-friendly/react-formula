
import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import clsx from 'clsx'

import SessionContext from '#cap/Context/Session'

import Spinner from '#cap/Components/Spinner'
import Icon from '#cap/Components/Icon'

import Links from './Links'

const navBarStyle = `fixed top-2 right-2 w-40 p-2 flex flex-col justify-center`

const linkStyle = `p-2 font-lato font-medium hover:text-emerald-200 hover:underline`

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
		//await (new Promise((r) => setTimeout(() => r(), 1000)).then((r) => r))
		setSigningOut(false)
	}
	
	const signOutButton = <Link onClick={handleSignOut} className={linkStyle + ' relative group'}>
		Sign Out <Spinner className={spinnerStyle + (!signingOut && ' invisible')} />
	</Link>
	
	return <div className="hidden sm:flex justify-center bg-emerald-800">
		<div className="w-full max-w-5xl flex p-8 justify-end items-center text-white">
			<div className="flex-1 flex justify-start items-center">
				<img className="w-10" title="brand logo"
					src="https://static-task-assets.react-formula.com/capstone_logo_light.png" />
				<div className="ml-8 font-playfair text-2xl">Rica's Plants</div>
			</div>	
			
			<Links linkstyle={linkStyle} />
					
			{session.isActive() && signOutButton}
			{!session.isActive() && <Link className={linkStyle} to="/sign-in">Sign In</Link>}
		</div>
	</div>
}

export default Bar
