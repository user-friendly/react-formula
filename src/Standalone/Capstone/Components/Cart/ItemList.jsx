
import _ from 'lodash'

import {twMerge} from 'tailwind-merge'

import ItemPlant from './ItemPlant'

const ItemList = (props) => {
	const {className, onRemove} = props
	const items = _.isArray(props.items) ? props.items : []
	
	return <div className={twMerge("p-6 flex flex-col", className)}>
		{items.map((item, i) => <ItemPlant key={i} item={item} onRemove={(item) => onRemove(item)} />)}
	</div>
}

export default ItemList
