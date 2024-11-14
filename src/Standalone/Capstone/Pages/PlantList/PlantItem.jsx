
import _ from 'lodash'

import {useState} from 'react'

import clsx from 'clsx'

const POT_COLORS = {
  stone: 'bg-stone-200', // #e7e5e4
  slate: 'bg-slate-300', // #cbd5e1
  sky: 	 'bg-sky-700',	 // #0369a1
  black: 'bg-gray-600',	 // #4b5563
  white: 'bg-gray-50',	 // #f9fafb
  amber: 'bg-amber-600', // #d97706
}

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
		<img className="w-[280px] h-[320px] object-cover rounded-md"
			alt={data.description} src={data.images[imageIdx].src} />
			
		<div className="my-3 flex justify-between">
			<div className="text-xl text-emerald-700">{data.name}</div>
			<div className="text-lg text-emerald-600">${price}</div>
		</div>
		
		<div className="my-3 flex justify-between">
			<div className={TEXT_COLORS[color] + ' font-medium'}>{color}</div>
			<div className="flex justify-end">
				{data.images.map((image, i) => <button key={i} className={clsx(
					'flex justify-center items-center ml-2 w-5 h-5 rounded-full block ',
					selected === i && 'outline outline-1 outline-offset-2 outline-slate-400',
					POT_COLORS[data.images[i].pot_color]
				)}
					onClick={() => {setSelected(i); setImageIdx(i)}}
					onMouseEnter={() => setImageIdx(i)}
					onMouseLeave={() => setImageIdx(selected)}
				/>)}
			</div>
		</div>
	</div>
}

export default PlantItem
