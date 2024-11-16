
import _ from 'lodash'

import {useState} from 'react'
import {useLocation} from 'react-router-dom'

import {Paragraph} from '#cap/Components/Text'
import PotColorButtons from '#cap/Components/PotColorButtons'

import PlantHeading from './PlantHeading'
import ColorPicker from './ColorPicker'
import BenefitBox from './BenefitBox'

const PlantInfo = (props) => {
	const location = useLocation()
	const [selected, setSelected] = useState(() => {
		if (_.has(location, 'state.plantImageIdx')) {
			return location.state.plantImageIdx
		}
		return 0
	})
	const [imageIdx, setImageIdx] = useState(selected)
	const {plant} = props
	
	return <div className="w-full max-w-5xl flex flex-col md:flex-row">
		<PlantHeading className="md:hidden" plant={plant} />
		
		<ColorPicker className="my-4 md:hidden"
			images={plant.images}
			selected={selected}
			onClick={(i) => {setSelected(i); setImageIdx(i)}}
			onMouseEnter={(i) => setImageIdx(i)}
			onMouseLeave={() => setImageIdx(selected)}
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
		</div>
	</div>
}

export default PlantInfo
