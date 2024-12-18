
import {useState, useRef, useEffect} from 'react'
import {Link} from 'react-router'
import clsx from 'clsx'

import AppSwitcher from '#AppSwitcher'

import Spinner from '#cap/Components/Spinner'
import Icon from '#cap/Components/Icon'

const linkStyle = `
	my-1 py-2 px-3 bg-sky-200 rounded-lg
	text-center font-lato font-medium text-sky-800 hover:text-sky-300 hover:bg-sky-600
`

const iconStyle = 'self-end bg-sky-200 text-sky-800 hover:text-sky-300 hover:bg-sky-600'

// Might find a use for this later.
//const spinnerStyle = `w-6 h-6 absolute top-2 right-2.5
//	border-4 border-transparent border-t-sky-800 group-hover:border-t-sky-300
//`

const NavBarUserFriendly = () => {
	const menuRef = useRef()
	const [show, setShow] = useState(false)
	
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setShow(false)
			}
		}
		
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])
	
	const hamButton = show ? <Icon name="close" className={iconStyle} onClick={(e) => setShow(false)}/>
		: <Icon name="menu" className={iconStyle} onClick={(e) => setShow(true)} />
	
	return <div ref={menuRef} className={clsx('fixed bottom-2 right-2 w-40 p-2 flex flex-col-reverse justify-center',
			show && 'bg-sky-100 rounded-lg shadow-lg'
		)}>
		
		{hamButton}
		
		<div className={'flex flex-col justify-center ' + (!show ? 'hidden' : null)}
			onClick={() => setShow(false)}
		>
			<AppSwitcher className={linkStyle} appid="default">Main App</AppSwitcher>
			<Link className={linkStyle} to="/style-guide">Style Guide</Link>
			<Link className={linkStyle} to="/">Rica's Plants</Link>
		</div>
	</div>
}

export default NavBarUserFriendly
