
import _ from 'lodash'

import {twMerge} from 'tailwind-merge'

import ItemPlant from './ItemPlant'

const ItemList = (props) => {
	const {items, className} = props
	
	return <div className="p-12 flex flex-col">
		{(_.isArray(items) && items.map((item, i) => <ItemPlant key={i} item={item} />))}
	</div>
}

export default ItemList
