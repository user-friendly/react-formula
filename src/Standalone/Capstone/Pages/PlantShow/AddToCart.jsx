
import {twMerge} from 'tailwind-merge'

import {useState} from 'react'

import {IconDecorative} from '#cap/Components/Icon'

const AddToCart = ({quantity, inProgress = false, className, onAddToCart, onIncrease, onDecrease}) => {
	const qtyContainerStyle = `text-2xl rounded-full border-2 border-neutral-400 flex items-center`
	const qtyButtonStyle = `px-2 py-1 text-4xl font-bold text-neutral-500`

	const cartButtonStyle = `ml-2 p-2 w-full max-w-80 rounded-full
		flex justify-center items-center
		bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-600 font-medium text-white text-lg`
	
	const iconCart = <IconDecorative className="text-white" name="add_shopping_cart" />
	const iconProgress = <IconDecorative className="text-white animate-spin" name="progress_activity" />
	
	return <div className={twMerge('my-4 flex items-center', className)}>
		<div className={qtyContainerStyle}>
			<button className={qtyButtonStyle} onClick={onDecrease}>
				<IconDecorative className="text-neutral-600" name="remove" />
			</button>
			<span>{quantity}</span>
			<button className={qtyButtonStyle} onClick={onIncrease}>
				<IconDecorative className="text-neutral-600" name="add" />
			</button>
		</div>
			
		<button className={cartButtonStyle} onClick={onAddToCart}>
			{inProgress ? iconProgress : iconCart} Add to Cart
		</button>
	</div>
}

export default AddToCart
