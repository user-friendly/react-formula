
import {IconDecorative} from '#cap/Components/Icon'

const BenefitBox = (props) => {
	return <div className="flex">
		<div className="my-4 px-4 flex flex-col items-center border-r border-gray-300">
			<IconDecorative name="check_circle" className="text-5xl" />
			<span className="my-1 font-bold text-gray-700 text-center">
				Guaranteed Healthy</span>
			<span className="text-gray-400 text-center">
				Guaranteed to arrive healthy or your money back</span>
		</div>
		<div className="my-4 px-4 flex flex-col items-center">
			<IconDecorative name="delivery_truck_speed" className="text-5xl" />
			<span className="my-1 font-bold text-gray-700 text-center">
				Free Shipping</span>
			<span className="text-gray-400 text-center">
				Get free ground shipping on orders of $50 or more</span>
		</div>
	</div>
}

export default BenefitBox
