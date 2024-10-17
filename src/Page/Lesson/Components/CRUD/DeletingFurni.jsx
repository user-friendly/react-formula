/**
 * Delete Furniture lesson.
 */

import {useState, useEffect} from 'react'

const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/deleting-furni/furnitures`

const getAllFurnitures = () => {
	return fetch(ENDPOINT_URL)
}

const deleteFurniture = (id) => {
	return fetch(`${ENDPOINT_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			comment: `User requested record (${id}) to be removed from data store.`,
		}),
	})
}

const FurnitureItem = (props) => {
	const {furniture, onDelete} = props
	return (
		<div className="flex m-8 border rounded-lg shadow-md border-stone-300 overflow-clip">
			<img
				src={furniture.image}
				className="object-cover w-48 h-48 border-r border-stone-300"
			/>
			<div className="flex flex-col w-full px-6 py-4 bg-white">
				<div className="mb-4 text-2xl text-stone-600">{furniture.name}</div>
				<div className="text-stone-500">{furniture.description}</div>
				<div className="text-right">
					<button
						className="px-3 py-2 bg-rose-500 rounded-lg text-white text-md hover:bg-rose-600 active:bg-rose-700"
						onClick={(e) => onDelete(e, furniture.id)}
					>
						🗑️ Delete
					</button>
				</div>
			</div>
		</div>
	)
}

const DeletingFurni = () => {
	const [furnitures, setFurnitures] = useState([])

	const fetchFurnitures = () => {
		getAllFurnitures()
			.then((response) => response.json())
			.then((data) => setFurnitures(data))
	}

	const handleDelete = (e, id) => {
		console.log(`Request to delete furniture by id: ${id}`)
		deleteFurniture(id)
			.then((r) => {
				if (!r.ok) {
					throw Error(r.statusText)
				}
				return r.json()
			})
			.then((r) => {
				console.log(`Deleted furniture, message: ${r.message}`)
				fetchFurnitures()
			})
			.catch((e) => console.log(`Failed to delete furniture (${id}): ${e}`))
	}

	useEffect(() => {
		fetchFurnitures()
	}, [])

	const furnitureItems = furnitures.map((furniture, idx) => (
		<FurnitureItem
			furniture={furniture}
			onDelete={handleDelete}
			key={furniture.id}
		/>
	))

	return (
		<div className="flex justify-center">
			<div className="w-full max-w-2xl">
				{furnitureItems.length
					? furnitureItems
					: 'Store is out of furniture items!'}
			</div>
		</div>
	)
}

export default DeletingFurni
