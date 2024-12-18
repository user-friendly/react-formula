/**
 * Item(s) select component.
 */

import _ from 'lodash'

const SelectItem = ({name, items = [], value, defaultValue, onSelect}) => {
	if (value !== '<none>') {
		console.log(`Select dropdown value: ${value}`)
	}

	const itemsRendered = _.sortBy(items, ['key']).map((i) => {
		const labelPrefix = value === i.value && value !== '<none>' ? '*' : ''
		return (
			<option key={i.key} value={i.value}>
				{labelPrefix + i.label}
			</option>
		)
	})

	if (_.isEmpty(items)) {
		return <></>
	}

	return (
		<>
			<select
				name={name}
				value={value}
				defaultValue={defaultValue}
				className='select-none cursor-pointer px-2.5 rounded-xl bg-sky-400 transition-bg'
				onChange={(e) => {
					onSelect(e, e.target.value)
				}}
			>
				{itemsRendered}
			</select>
		</>
	)
}

export default SelectItem
