
import _ from 'lodash'

import {useState, useRef, useEffect} from 'react'
import clsx from 'clsx'

import Icon from '#cap/Components/Icon'

import Links from './Links'

const iconStyle = 'self-end bg-emerald-800 text-emerald-200 hover:text-emerald-300 hover:bg-emerald-600'
const iconShowStyle = 'self-end bg-emerald-200 text-emerald-800 hover:text-emerald-300 hover:bg-emerald-600'

const Ham = () => {
	const menuRef = useRef()
	const [show, setShow] = useState(false)

	const hideMenu = (e) => {
		setShow(false)
	}
	
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				hideMenu()
			}
		}
		
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])
	
	const hamButton = show ? <Icon name="close" className={iconShowStyle} onClick={(e) => setShow(false)}/>
		: <Icon name="menu" className={iconStyle} onClick={(e) => setShow(true)} />
	
	return <div ref={menuRef} className={clsx('sm:hidden fixed top-2 right-2 w-40 p-2 flex flex-col justify-center',
			show && 'bg-emerald-800/95 rounded-lg shadow-lg'
		)}>
		
		{hamButton}
		
		<div className={'flex flex-col justify-center ' + (!show ? 'hidden' : null)} onClick={hideMenu}>
			<Links isHam={true} />
		</div>
	</div>
}

export default Ham
