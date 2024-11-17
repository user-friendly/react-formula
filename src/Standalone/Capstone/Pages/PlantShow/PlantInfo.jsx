
import _ from 'lodash'

import {useState, useContext} from 'react'
import {useLocation} from 'react-router-dom'

import SessionContext from '#cap/Context/Session'
import {ApiAddToCart} from '#cap/Services'

import {Paragraph} from '#cap/Components/Text'

import PlantHeading from './PlantHeading'
import ColorPicker from './ColorPicker'
import BenefitBox from './BenefitBox'
import AddToCart from './AddToCart'

const PlantInfo = (props) => {
	const session = useContext(SessionContext)
	const location = useLocation()
	const [selected, setSelected] = useState(() => {
		if (_.has(location, 'state.plantImageIdx')) {
			return location.state.plantImageIdx
		}
		return 0
	})
	const [imageIdx, setImageIdx] = useState(selected)
	const [quantity, setQuantity] = useState(1)
	const [inProgress, setInProgress] = useState(false)
	const [status, setStatus] = useState({error: false})
	const {plant} = props
	
	const handleAddToCart = (e) => {
		if (inProgress) {
			return
		}
		setInProgress(true)
		setStatus({error: false});
		
		(async () => {
			// Create cart item.
			const cartItem = {
				plant: {
					uuid: plant.uuid,
					quantity: quantity,
					pot_color: plant.images[selected].pot_color,
				}
			}
			// Currently, API method accepts single item.
			const result = await ApiAddToCart(session?.data, cartItem)
			if (result.error === false) {
				console.log(`Added {${cartItem.plant.quantity}} {${cartItem.plant.pot_color}} plants to cart.`)
			} else {
				console.error(`Failed to get plants list. Response:`, result)
			}
			setStatus(result)
			setInProgress(false)
		})();
	}
	
	return <div className="w-full max-w-5xl flex flex-col md:flex-row">
		<PlantHeading className="md:hidden" plant={plant} />
		
		<ColorPicker className="my-4 md:hidden"
			images={plant.images}
			selected={selected}
			onClick={(i) => {setSelected(i); setImageIdx(i)}}
			onMouseEnter={(i) => setImageIdx(i)}
			onMouseLeave={() => setImageIdx(selected)}
		/>
		<AddToCart className="md:hidden"
			quantity={quantity} inProgress={inProgress}
			onAddToCart={handleAddToCart}
			onIncrease={(e) => setQuantity(quantity+1)}
			onDecrease={(e) => setQuantity(quantity > 1 ? quantity-1 : 1)}
		/>
		
		<div className="flex-1 flex flex-col">
			<img className="rounded-lg" title={plant.botanical_name} src={plant.images[imageIdx].src} />
			<BenefitBox />
		</div>
		
		<div className="md:ml-8 flex-1 flex flex-col">
			<PlantHeading className="hidden md:block" plant={plant} />
			<Paragraph className="py-2 px-0 text-gray-600">{plant.description}</Paragraph>
			<ColorPicker className="my-4 hidden md:block"
				images={plant.images}
				selected={selected}
				onClick={(i) => {setSelected(i); setImageIdx(i)}}
				onMouseEnter={(i) => setImageIdx(i)}
				onMouseLeave={() => setImageIdx(selected)}
			/>
			<AddToCart className="hidden md:flex"
				quantity={quantity} inProgress={inProgress}
				onAddToCart={handleAddToCart}
				onIncrease={(e) => setQuantity(quantity+1)}
				onDecrease={(e) => setQuantity(quantity > 1 ? quantity-1 : 1)}
			/>
		</div>
	</div>
}

export default PlantInfo
