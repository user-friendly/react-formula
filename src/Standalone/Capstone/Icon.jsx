
import _ from 'lodash'

import {twMerge} from 'tailwind-merge'

const iconStyle = `
	p-2 rounded-lg bg-green-100 select-none cursor-pointer
	hover:bg-green-200 text-green-700
`

const Icon = (props) => {
	if (props.name === undefined) {
		return <></>
	}
	const name = props.name
	const className = props.className
	const newProps = _.omit(_.clone(props), ['name', 'className'])
	// material-symbols-outlined class is always on.
	return <span className={'material-symbols-outlined ' + twMerge(iconStyle, className)} {...newProps}>{name}</span>
}

export default Icon