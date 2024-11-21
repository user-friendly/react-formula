
import {useState, useContext} from 'react'

import SessionContext from '#cap/Context/Session'
import {ApiRemoveFromCart} from '#cap/Services'

import {IconDecorative} from '#cap/Components/Icon'
import Spinner from '#cap/Components/Spinner'

// Example of a plant item:
// 
// [{
// 		plant: {
// 			uuid: '550e8400-e29b-41d4-a716-446655440000',
// 			quantity: 1,
// 			pot_color: 'amber',
//			
//			name: "Bulby Shmukuz",
//			price: 13.37,
//			image: {src: "/images/bulbysmukuz-amber-600.jpeg"},
// 		}
// }]

const ItemPlant = ({item, onRemove}) => {
	const session = useContext(SessionContext)
	const [inProgress, setInProgress] = useState()
	const [status, setStatus] = useState({error: false})
	const {
		uuid, quantity, pot_color,
		name, price, image
	} = item.plant
	const totalPrice = Number(price * quantity).toFixed(2)
	
	const handleRemove = (e) => {
		if (inProgress) {
			return
		}
		setInProgress(true)
		setStatus({error: false});
		
		(async () => {
			// Currently, API method accepts single item.
			const result = await ApiRemoveFromCart(session?.data, item.id)
			if (result.error === false) {
				console.log(`Removed item {${item.id}} from cart.`)
				onRemove(item)
			} else {
				console.error(`Failed to remove item from cart. Response:`, result)
			}
			setStatus(result)
			setInProgress(false)
		})();
	}
	
	const spinner = <Spinner />
	
	const message = status?.error !== false && (
		<div className="mt-4 px-2 py-1 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium text-center">
			{status.message}
		</div>
	)
	
	return <div className="mb-10 pb-10 border-b-2 flex text-neutral-500 font-bold">
		<div className="basis-2/6 pb-6">
			<img className="w-48 rounded-lg" alt={name} src={image.src} />
		</div>
		<div className="pl-8 flex-1 flex flex-col">
			<div className="flex justify-between">
				<span className="font-playfair text-lg sm:text-3xl text-emerald-700 font-normal">{name}</span>
				<span className="ml-2">${totalPrice}</span>
			</div>
			<div className="my-2">
				<span className="w-16 inline-block text-neutral-400 font-normal">qty: </span>{quantity}
			</div>
			<div>
				<span className="w-16 inline-block text-neutral-400 font-normal">color: </span>{pot_color}
			</div>
			<div className="pt-2 flex-1 flex justify-end items-end">
				{message || 
				<button className="flex items-center group hover:text-rose-700 active:translate-y-1" onClick={handleRemove}>
					{inProgress ? spinner
						: <>remove <IconDecorative className="m-0 p-0 text-md text-neutral-400 group-hover:text-rose-700" name="delete" /></>
					}
				</button>}
			</div>
		</div>
	</div>
}

export default ItemPlant
