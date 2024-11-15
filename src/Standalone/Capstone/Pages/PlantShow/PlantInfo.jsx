
import {Heading, Paragraph} from '#cap/Components/Text'
import {IconDecorative} from '#cap/Components/Icon'

const PlantInfo = (props) => {
	const plant = props.plant
	
	return 	<div className="w-full max-w-5xl flex">
		<div className="flex-1 max-w-[550px] flex flex-col">
			<img className="w-[500px] rounded-lg" title={plant.botanical_name} src={plant.images[0].src} />
			<div className="flex">
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
						Guaranteed to arrive healthy or your money back</span>
				</div>
			</div>
		</div>
		
		<div className="ml-8 flex flex-col">
			<Heading className="text-4xl flex justify-between">
				<span>{plant.name}</span>
				<span>${plant.price}</span>
			</Heading>
			<span className="mt-2 italic text-gray-400">{plant.botanical_name}</span>
			<Paragraph className="text-gray-600">{plant.description}</Paragraph>
		</div>
	</div>
}

export default PlantInfo
