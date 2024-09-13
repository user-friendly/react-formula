/**
 * Item(s) select component.
 */

import _ from 'lodash'

const style = `
	select-none
	cursor-pointer
	
	px-2.5
	
	rounded-xl
	bg-sky-400
	
	transition-bg
`;

const SelectItem = ({name, items = [], value, onSelect}) => {
	const itemsRendered = _.sortBy(items, ['key']).map(i => {
		return <option key={i.key} value={i.value}>{i.label}</option>
	})
	
	if (_.isEmpty(items)) {
		return <></>
	}
	
	return <>
		<select name={name} defaultValue={value} onChange={e => {onSelect(e, e.target.value)}} className={style}>
			{itemsRendered}
		</select>
	</>
}

export default SelectItem
