import _ from 'lodash'
import {twMerge} from 'tailwind-merge'

const defaultStyle = `
	w-8 h-8 animate-spin rounded-full
	border-8 border-emerald-600 border-t-emerald-200
`

const Spinner = (props) => {
	const className = props.className
	const newProps = _.omit(_.clone(props), ['name', 'className', 'children'])
	return (
		<div {...newProps} className={twMerge(defaultStyle, className)}>{props.children}</div>
	)
}

export default Spinner
