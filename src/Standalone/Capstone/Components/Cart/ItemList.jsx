
import _ from 'lodash'
import clsx from 'clsx'
import {twMerge} from 'tailwind-merge'

import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router'
import {RemoveScroll} from 'react-remove-scroll'

import SessionContext from '#cap/Context/Session'
import {ApiGetCart} from  '#cap/Services'

// import {RequireSession} from '#cap/Components/AccessControl'

import Spinner from '#cap/Components/Spinner'
import {default as Icon, IconDecorative} from '#cap/Components/Icon'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

import ItemPlant from './ItemPlant'

const REFRESHING_STATE = 1

const linkStyle = `underline text-neutral-400 hover:text-neutral-600 active:translate-y-0.5`

const checkoutButtonStyle = `p-2 self-stretch rounded-full
	flex justify-center items-center
	bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-600 font-medium text-white text-lg`

const Footer = ({list}) => {
	if (!_.isArray(list) || _.isEmpty(list)) {
		return <></>
	}
	
	const count = list.length
	const total = list.reduce((total, item) => total + item.plant.price, 0)
	
	return <div className="p-6 pt-2 text-neutral-400 flex flex-col items-end">
		<div className="my-4 self-stretch flex justify-between items-center">
			<div>{count} items</div>
			<div className="flex items-center">subtotal:
				<span className="ml-2 text-neutral-500 text-lg font-bold">${total.toFixed(2)}</span>
			</div>
		</div>
		<button className={checkoutButtonStyle}>
			Checkout <IconDecorative className="text-white text-2xl" name="shopping_cart_checkout" />
		</button>
	</div>
}

const ItemList = (props) => {
	const {className, onRemove} = props
	const session = useContext(SessionContext)
	const [list, setList] = useState(null)
	const [status, setStatus] = useState({error: false})
	
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
		refreshList()
	}, [session.data])

	const handleItemRemoved = (item) => {
		const idx = list.findIndex((listItem) => listItem.id === item.id)
		if (list[idx] !== undefined) {
			list.splice(idx, 1)
			setList([...list])
		}
	}
	
	const spinner = <div className="flex-1 flex justify-center items-center"><Spinner /></div>
	const iconRefresh = <Icon name="refresh" className={clsx('rounded-full', 
		list === REFRESHING_STATE && 'animate-spinOnce'
	)} />
	const buttonRefresh = <button onClick={() => refreshList()}>{iconRefresh}</button>
	
	const message = status?.error !== false && (
		<div className="px-2 py-1 flex justify-center items-center bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
			{status.message}
		</div>
	)
	
	return <div className={twMerge("w-full max-w-lg p-4 flex-1 flex flex-col bg-emerald-50", className)}>
		{message}
		{list === REFRESHING_STATE && spinner}
		{list !== REFRESHING_STATE && _.isEmpty(list) && <>
			<div>Your cart is empty.</div>
			<div>Visit the <Link className={linkStyle} to="/plants">Plant List</Link>
				&nbsp;page for a great selection of plants ready to be Yours!</div>
		</>}
		<div className="p-6 pb-0 flex flex-col">
			{_.isArray(list) && list.map((item, i) => <ItemPlant key={i} item={item} onRemove={handleItemRemoved} />)}
		</div>
		<Footer list={list} />
	</div>
}

export default ItemList
