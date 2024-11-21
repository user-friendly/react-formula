
import _ from 'lodash'
import clsx from 'clsx'

import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {RemoveScroll} from 'react-remove-scroll'

import SessionContext from '#cap/Context/Session'
import {ApiGetCart, ApiAddToCart, ApiRemoveFromCart, ApiClearCart} from  '#cap/Services'

import {RequireSession} from '#cap/Components/AccessControl'

import NavHeader from '#cap/Components/NavHeader'
import Spinner from '#cap/Components/Spinner'
import Icon from '#cap/Components/Icon'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

import {ItemList} from './'

const REFRESHING_STATE = 1

const cartModalId = 'cart-modal'

const modalStyle = `fixed top-0 right-0 w-full h-full bg-black/30 backdrop-blur-sm
	flex-col items-end overflow-auto
`
const linkStyle = `underline text-neutral-400 hover:text-neutral-600 active:translate-y-0.5`

const ShowCartModal = () => {
	window.dispatchEvent(new Event('showCartModal'))
}

const HideCartModal = () => {
	window.dispatchEvent(new Event('hideCartModal'))
}

const Modal = () => {
	const session = useContext(SessionContext)
	const [show, setShow] = useState(false)
	const [list, setList] = useState(null)
	const [status, setStatus] = useState({error: false})
	
	const handleShow = () => {
		setShow(true)
	}
	const handleHide = () => {
		setShow(false)
	}
	
	const refreshList = async () => {
		if (!session.isActive() || list === REFRESHING_STATE) {
			return
		}
		setStatus({error: false})
		setList(REFRESHING_STATE)
		const result = await ApiGetCart(session?.data)
		if (result.error === false) {
			setList(result.data)
		} else {
			console.error(`Failed to get cart item list. Response:`, result)
			setList(null)
		}
		setStatus(result)
	}
	
	useEffect(() => {
		if (show === true) {
			refreshList()
		}
	}, [session.data, show])
	
	useEffect(() => {
	  window.addEventListener('showCartModal', handleShow);
	  window.addEventListener('hideCartModal', handleHide);
	  return () => {
	    window.removeEventListener('showCartModal', handleShow);
	    window.removeEventListener('hideCartModal', handleHide);
	  }
	}, [show])
	
	const iconClose = <Icon name="close" className="rounded-full" />
	const iconRefresh = <Icon name="refresh" className={clsx('rounded-full', 
		list === REFRESHING_STATE && 'animate-spinOnce'
	)} />
	const spinner = <div className="flex-1 flex justify-center items-center"><Spinner /></div>
	const message = status?.error !== false && (
		<div className="px-2 py-1 flex justify-center items-center bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
			{status.message}
		</div>
	)
	
	const handleBackgroundClick = (e) => {
		if (e.target.id === cartModalId) {
			HideCartModal()
		}
	}
	
	const handleItemRemoved = (item) => {
		const idx = list.findIndex((listItem) => listItem.id === item.id)
		if (list[idx] !== undefined) {
			list.splice(idx, 1)
			setList([...list])
		}
	}
	
	return <RequireSession><RemoveScroll enabled={show}>
		<Section id={cartModalId} className={clsx(!show && "hidden" || "flex", modalStyle)}
			onClick={handleBackgroundClick}
		>
			<div className="w-full max-w-lg p-8 flex justify-between bg-emerald-800">
				<button onClick={() => refreshList()}>{iconRefresh}</button>
				<Heading className="flex-1 text-center text-2xl text-white">
					{_.get(session, "data.username")}'s Cart
				</Heading>
				<button onClick={HideCartModal}>{iconClose}</button>
			</div>
			<div className="w-full max-w-lg p-4 flex-1 flex flex-col bg-emerald-50">
				{list === REFRESHING_STATE && spinner}
				{message}
				<ItemList className="p-2" items={list} onRemove={handleItemRemoved} />
				{list !== REFRESHING_STATE && _.isEmpty(list) && <>
					<div>Your cart is empty.</div>
					<div>Visit the <Link className={linkStyle} to="/plants">Plant List</Link>
						&nbsp;page for a great selection of plants ready to be Yours!</div>
				</>}
			</div>
		</Section>
	</RemoveScroll></RequireSession>
}

export {ShowCartModal, HideCartModal}
export default Modal
