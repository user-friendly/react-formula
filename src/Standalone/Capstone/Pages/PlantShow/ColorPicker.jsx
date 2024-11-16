
import {twMerge} from 'tailwind-merge'

import {IconDecorative} from '#cap/Components/Icon'

import {POT_COLORS} from '#cap/Utility'

const ColorPicker = (props) => {
	const {
		images, selected, className,
		onClick, onMouseEnter, onMouseLeave
	} = props
	
	// Leaving the group selectors as an example.
	const buttonStyle = `m-2 w-8 h-8 outline-2 md:w-12 md:h-12 md:outline-offset-4
		hover:outline hover:outline-1 group-[.selected]:hover:outline-2 hover:outline-slate-400`
	const labelStyle = `text-lg md:text-xl text-slate-400 group-[.selected]:font-bold group-[.selected]:text-slate-600`
	
	return <div className={className}>
		<div className="flex items-center text-2xl font-bold">
			<IconDecorative className="text-4xl" name="format_paint" /> Pot Color
		</div>
		<div className="flex flex-wrap justify-start">
			{images.map((image, i) => <div className={'mx-1 flex flex-col items-center ' + (selected === i && 'group selected')}
				key={i}>
					<button className={twMerge('w-5 h-5 rounded-full block',
							selected === i && 'outline outline-1 outline-offset-2 outline-slate-400',
							POT_COLORS[images[i].pot_color],
							buttonStyle
						)}
						onClick={() => onClick(i)}
						onMouseEnter={() => onMouseEnter(i)}
						onMouseLeave={() => onMouseLeave(i)} />
					<span className={labelStyle}>{images[i].pot_color}</span>
				</div>
			)}
		</div>
	</div>
}

export default ColorPicker
