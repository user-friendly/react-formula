
import {twMerge} from 'tailwind-merge'

import {POT_COLORS} from '#cap/Utility'

const ColorPicker = (props) => {
	const {images, selected, className,
		onClick, onMouseEnter, onMouseLeave,
		buttonStyle, labelStyle
	} = props
	
	return <div className={className}>
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
				{/*<span className={labelStyle}>{images[i].pot_color}</span>*/}
			</div>
		)}
	</div>
}

export default ColorPicker
