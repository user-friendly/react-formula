
import _ from 'lodash'

import {useState} from 'react'
import {useLocation} from 'react-router-dom'

import {Paragraph} from '#cap/Components/Text'
import {IconDecorative} from '#cap/Components/Icon'
import PotColorButtons from '#cap/Components/PotColorButtons'

import PlantHeading from './PlantHeading'
import BenefitBox from './BenefitBox'

const ColorPicker = (props) => {
	const {
		images, selected, className,
		onClick, onMouseEnter, onMouseLeave
	} = props
	
	const buttonStyle = `m-2 w-12 h-12 outline-2 outline-offset-4 hover:outline hover:outline-1 group-[.selected]:hover:outline-2 hover:outline-slate-400`
	const labelStyle = `text-xl text-slate-400 group-[.selected]:font-bold group-[.selected]:text-slate-600`
	
	return <div className={className}>
		<div className="flex items-center text-2xl font-bold">
		<IconDecorative className="text-4xl" name="format_paint" /> Pot Color</div>
		<PotColorButtons className="flex justify-start"
			images={images}
			selected={selected}
			buttonStyle={buttonStyle}
			labelStyle={labelStyle}
			labels={true}
			onClick={(i) => onClick(i)}
			onMouseEnter={(i) => onMouseEnter(i)}
			onMouseLeave={(i) => onMouseLeave(i)}
		/>
	</div>
}

const PlantInfo = (props) => {
	const location = useLocation()
	const [selected, setSelected] = useState(() => {
		if (_.has(location, 'state.plantImageIdx')) {
			return location.state.plantImageIdx
		}
	})
	const [imageIdx, setImageIdx] = useState(selected)
	
	const {plant} = props
	
	return 	<div className="w-full max-w-5xl flex flex-col md:flex-row">
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
