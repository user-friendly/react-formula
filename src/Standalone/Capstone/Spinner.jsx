import _ from 'lodash'
import {twMerge} from 'tailwind-merge'

const defaultStyle = `
	w-8 h-8 animate-spin rounded-full 
	border-4 border-green-600 border-t-white
`

const Spinner = (props) => {
	const className = props.className
	const newProps = _.omit(_.clone(props), ['name', 'className', 'children'])
	return (
		<div {...newProps} className={twMerge(defaultStyle, className)}>{props.children}</div>
	)
}

export default Spinner
