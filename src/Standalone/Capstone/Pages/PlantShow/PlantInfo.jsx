
import {Heading, Paragraph} from '#cap/Components/Text'
import {IconDecorative} from '#cap/Components/Icon'

const PlantHeading = (props) => {
	const {plant, className} = props
	return <div className={className}>
		<Heading className="text-4xl flex justify-between">
			<span>{plant.name}</span>
			<span>${plant.price}</span>
		</Heading>
		<span className="my-2 inline-block italic text-gray-400 text-lg">{plant.botanical_name}</span>
	</div>
}

const PlantInfo = (props) => {
	const {plant} = props
	
	return 	<div className="w-full max-w-5xl flex flex-col md:flex-row">
		<PlantHeading className="mb-4 md:hidden" plant={plant} />
		
		<div className="flex-1 flex flex-col">
			<img className="rounded-lg" title={plant.botanical_name} src={plant.images[0].src} />
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
						Get free ground shipping on orders of $50 or more</span>
				</div>
			</div>
		</div>
		
		<div className="md:ml-8 flex-1 flex flex-col">
			<PlantHeading className="hidden md:block" plant={plant} />
			<Paragraph className="py-2 px-0 text-gray-600">{plant.description}</Paragraph>
		</div>
	</div>
}

export default PlantInfo
