
import {useState, useRef, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import clsx from 'clsx'

import SessionContext from '#cap/Context/Session'

import AppSwitcher from '#AppSwitcher'

import Spinner from '#cap/Spinner'
import Icon from '#cap/Icon'

import Links from './Links'

const linkStyle = `
	my-1 py-2 px-3 bg-emerald-200 rounded-lg
	text-center font-lato font-medium text-emerald-800 hover:text-emerald-300 hover:bg-emerald-600
`

const iconStyle = 'self-end bg-emerald-800 text-emerald-200 hover:text-emerald-300 hover:bg-emerald-600'
const iconShowStyle = 'self-end bg-emerald-200 text-emerald-800 hover:text-emerald-300 hover:bg-emerald-600'

const spinnerStyle = `w-6 h-6 absolute top-2 right-2.5
	border-transparent border-t-emerald-800 group-hover:border-t-emerald-300
`

const Ham = () => {
	const navigate = useNavigate()
	const session = useContext(SessionContext)
	const menuRef = useRef()
	const [show, setShow] = useState(false)
	const [signingOut, setSigningOut] = useState(false)

	const hideMenu = (e) => {
		setShow(signingOut)
	}
	
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				hideMenu()
			}
		}
		
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [signingOut])
	
	const hamButton = show ? <Icon name="close" className={iconShowStyle} onClick={(e) => setShow(signingOut)}/>
		: <Icon name="menu" className={iconStyle} onClick={(e) => setShow(true)} />
	
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
		//await (new Promise((r) => setTimeout(() => r(), 5000)).then((r) => r))
		setSigningOut(false)
		setShow(false)
	}

	const signOutButton = <button onClick={handleSignOut} className={linkStyle + 'relative group'} to="/sign-out">
		Sign Out{signingOut && <Spinner className={spinnerStyle} />}
	</button>
	
	return <div ref={menuRef} className={clsx('sm:hidden fixed top-2 right-2 w-40 p-2 flex flex-col justify-center',
			show && 'bg-emerald-800 rounded-lg shadow-lg'
		)}>
		
		{hamButton}
		
		<div className={'flex flex-col justify-center ' + (!show ? 'hidden' : null)}
			onClick={hideMenu}
		>
			<Links linkstyle={linkStyle} />
			
			{session.isActive() && signOutButton}
			{!session.isActive() && <Link className={linkStyle} to="/sign-in">Sign In</Link>}
		</div>
	</div>
}

export default Ham
