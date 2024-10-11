/**
 * Cat Card component.
 */

import CatCardRow from './CatCardRow'

const CatCard = ({children, cat}) => {
	return (
		<div className="flex flex-col border border-neutral-600 rounded-lg mx-4">
			<div>
				<img
					className="w-80 h-64 object-cover rounded-t-lg"
					src={cat.imageUrl}
				/>
			</div>
			<div className="p-4">
				<CatCardRow label="Name" text={cat.name} />
				<CatCardRow label="Age" text={cat.age} />
				<CatCardRow label="Breed" text={cat.breed} />
				<CatCardRow label="Location" text={cat.location} />
			</div>
		</div>
	)
}

export default CatCard
