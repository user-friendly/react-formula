
import _ from 'lodash'

import {useState, useRef, useEffect} from 'react'
import clsx from 'clsx'

import {RemoveScroll} from 'react-remove-scroll'

import Icon from '#cap/Components/Icon'

import Links from './Links'

const iconShowStyle = 'block sm:hidden text-5xl bg-emerald-800 text-emerald-200 hover:text-emerald-300 hover:bg-emerald-600'
const iconCloseStyle = 'self-end mr-1 bg-emerald-200 text-emerald-800 hover:text-emerald-300 hover:bg-emerald-600'

const modalBgStyle = 'fixed top-0 right-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-end items-start'

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
	
	return <>
		<Icon name="menu" className={iconShowStyle} onClick={(e) => setShow(true)} />
		<RemoveScroll enabled={show}>
			<div className={clsx(!show && 'hidden', modalBgStyle)}>
				<nav ref={menuRef} className='p-4 flex flex-col justify-center block bg-emerald-800/95 rounded-bl-lg'>
					<Icon name="close" className={iconCloseStyle} onClick={(e) => setShow(false)}/>
					
					<div className="flex flex-col justify-center overflow-y-auto" onClick={hideMenu}>
						<Links isHam={true} />
					</div>
				</nav>
			</div>
		</RemoveScroll>
	</>
}

export default Ham
