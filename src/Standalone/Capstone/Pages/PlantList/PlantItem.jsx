
import _ from 'lodash'

import {useState} from 'react'
import {Link} from 'react-router-dom'

import ColorPicker from './ColorPicker'

const TEXT_COLORS = {
  stone: 'text-stone-400', // #e7e5e4
  slate: 'text-slate-500', // #cbd5e1
  sky: 	 'text-sky-700',   // #0369a1
  black: 'text-gray-600',  // #4b5563
  white: 'text-gray-400',  // #f9fafb
  amber: 'text-amber-600', // #d97706
}

const PlantItem = (props) => {
	const [selected, setSelected] = useState(() => _.random(0, props.data.images.length-1))
	const [imageIdx, setImageIdx] = useState(selected)
	
	const {data} = props
	const price = Number(data.price).toFixed(2)
	const color = data.images[imageIdx].pot_color
	
	return <div className="mx-5 my-8">
		<Link to={`/plant/${data.uuid}`} state={{plantImageIdx: selected}}>
			<img className="w-[280px] h-[320px] object-cover rounded-md"
				alt={data.description} src={data.images[imageIdx].src} />
		</Link>
		
		<div className="my-3 flex justify-between">
			<div className="text-xl text-emerald-700">{data.name}</div>
			<div className="text-lg text-emerald-600">${price}</div>
		</div>
		
		<div className="my-3 flex justify-between">
			<div className={TEXT_COLORS[color] + ' font-medium'}>{color}</div>
			<ColorPicker className="flex justify-end"
				images={data.images}
				selected={selected}
				onClick={(i) => {setSelected(i); setImageIdx(i)}}
				onMouseEnter={(i) => setImageIdx(i)}
				onMouseLeave={() => setImageIdx(selected)}
			/>
		</div>
	</div>
}

export default PlantItem
