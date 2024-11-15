
import {Heading} from '#cap/Components/Text'

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

export default PlantHeading
