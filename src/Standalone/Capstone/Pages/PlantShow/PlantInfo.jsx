
import {Paragraph} from '#cap/Components/Text'

import PlantHeading from './PlantHeading'
import BenefitBox from './BenefitBox'

const PlantInfo = (props) => {
	const {plant} = props
	
	return 	<div className="w-full max-w-5xl flex flex-col md:flex-row">
		<PlantHeading className="mb-4 md:hidden" plant={plant} />
		
		<div className="flex-1 flex flex-col">
			<img className="rounded-lg" title={plant.botanical_name} src={plant.images[0].src} />
			<BenefitBox />
		</div>
		
		<div className="md:ml-8 flex-1 flex flex-col">
			<PlantHeading className="hidden md:block" plant={plant} />
			<Paragraph className="py-2 px-0 text-gray-600">{plant.description}</Paragraph>
		</div>
	</div>
}

export default PlantInfo
