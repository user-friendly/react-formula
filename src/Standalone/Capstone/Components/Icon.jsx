
import _ from 'lodash'

import {twMerge} from 'tailwind-merge'

const iconStyle = `
	p-2 rounded-lg bg-emerald-100 select-none cursor-pointer
	hover:bg-emerald-200 active:bg-emerald-300 text-emerald-700
`

const iconDecorativeStyle = `text-[2rem] p-2 select-none text-emerald-700`

// TODO Is this an Icon or is it a button?

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

const IconDecorative = (props) => {
	if (props.name === undefined) {
		return <></>
	}
	const name = props.name
	const className = props.className
	const newProps = _.omit(_.clone(props), ['name', 'className'])
	// material-symbols-outlined class is always on.
	return <span className={'material-symbols-outlined ' + twMerge(iconDecorativeStyle, className)} {...newProps}>{name}</span>
}

export {IconDecorative}
export default Icon
