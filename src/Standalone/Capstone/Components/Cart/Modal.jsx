
import clsx from 'clsx'

import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router'
import {RemoveScroll} from 'react-remove-scroll'
import SessionContext from '#cap/Context/Session'
import {RequireSession} from '#cap/Components/AccessControl'
import NavHeader from '#cap/Components/NavHeader'
import Spinner from '#cap/Components/Spinner'
import Icon from '#cap/Components/Icon'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

import {default as ItemList} from './'

const REFRESHING_STATE = 1

const cartModalId = 'cart-modal'

const modalStyle = `fixed top-0 right-0 w-full h-full bg-black/30 backdrop-blur-sm
	flex-col items-end overflow-auto
`

const ShowCartModal = () => {
	window.dispatchEvent(new Event('showCartModal'))
}

const HideCartModal = () => {
	window.dispatchEvent(new Event('hideCartModal'))
}

const Modal = () => {
	const session = useContext(SessionContext)
	const [show, setShow] = useState(false)
	
	const handleShow = () => {
		setShow(true)
	}
	const handleHide = () => {
		setShow(false)
	}
	
	useEffect(() => {
	  window.addEventListener('showCartModal', handleShow);
	  window.addEventListener('hideCartModal', handleHide);
	  return () => {
	    window.removeEventListener('showCartModal', handleShow);
	    window.removeEventListener('hideCartModal', handleHide);
	  }
	}, [show])
	
	const iconClose = <Icon name="close" className="rounded-full" />
	
	const handleBackgroundClick = (e) => {
		if (e.target.id === cartModalId) {
			HideCartModal()
		}
	}
	
	return <RequireSession><RemoveScroll enabled={show}>
		<Section id={cartModalId} className={clsx(!show && "hidden" || "flex", modalStyle)}
			onClick={handleBackgroundClick}
		>   
			<div className="w-full max-w-lg p-8 flex justify-between bg-emerald-800 animate-slideRight">
				<Heading className="flex-1 text-center text-2xl text-white">
					{session.data?.username}'s Cart
				</Heading>
				<button onClick={HideCartModal}>{iconClose}</button>
			</div>
			{show && <ItemList className="animate-slideRight" />}
		</Section>
	</RemoveScroll></RequireSession>
}

export {ShowCartModal, HideCartModal}
export default Modal
