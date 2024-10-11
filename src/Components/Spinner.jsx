import _ from 'lodash'

const defaults = {
	anim: 'animate-spin',
	rounded: 'rounded-full',
	dim: 'w-8 h-8',
	borderWidth: 'border-4',
	borderColor: 'border-gray-700',
	borderColorTop: 'border-t-transparent',
	bg: 'bg-gray-300',
	extra: '',
}

const Spinner = (props) => {
	props = _.defaults({}, props, defaults)
	return (
		<div
			className={`${props.anim} ${props.rounded} ${props.dim}
		${props.borderWidth} ${props.borderColor} ${props.borderColorTop}
		${props.bg} ${props.extra}
	`}
		>
			{props.children}
		</div>
	)
}

export default Spinner
