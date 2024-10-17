/**
 * Furniture lessons.
 */

import {useState, useEffect, Fragment} from 'react'

import Form from '#Components/Form'

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

const updateFurniture = (id, record) => {
	return fetch(`${ENDPOINT_URL}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(record),
	})
}

const FurnitureItem = (props) => {
	const {furniture, onDelete, onUpdate, onError} = props
	const [name, setName] = useState(furniture.name)
	const [desc, setDesc] = useState(furniture.description)
	const [editing, setEditing] = useState(false)
	
	const handleCancel = () => {
		setName(furniture.name)
		setDesc(furniture.description)
		setEditing(false)
	}
	
	const handleUpdate = () => {
		if (name === furniture.name && desc === furniture.description) {
			console.log(`Nothing to update for item ${furniture.id}.`)
			handleCancel()
			return
		}
		
		updateFurniture(furniture.id, {
			name: name,
			description: desc,
		})
		.then(async (r) => {
			if (!r.ok) {
				const body = await r.json()
				throw new Error(body.message !== undefined ? body.message : r.statusText)
			}
			setEditing(false)
			onUpdate()
		})
		.catch((e) => {
			handleCancel()
			onError(e)
		})
	}
	
	return (
		<div className="flex m-8 border rounded-lg shadow-md border-stone-300 overflow-clip">
			<img
				src={furniture.image}
				className="object-cover w-48 h-48 border-r border-stone-300"
			/>
			<div className="flex flex-col w-full px-6 py-4 bg-white">
				{editing ? <>
					<Form onSubmit={handleUpdate}
						className="flex flex-col"
					>
						<input
							className="my-1 p-2 border border-neutral-200 rounded-lg shadow-inner"
							onChange={(e) => setName(e.target.value)} value={name} name="name" placeholder="furniture name" />
						<textarea
							className="my-1 p-2 border border-neutral-200 rounded-lg shadow-inner"
							onChange={(e) => setDesc(e.target.value)} name="description" value={desc}></textarea>
						<div className="self-end mt-5">
							<button
								className="mx-1 px-3 py-2 bg-teal-500 rounded-lg text-white text-md hover:bg-teal-600 active:bg-teal-700" 
								type="submit"
							>✔ Save</button>
							<button
								className="mx-1 px-3 py-2 bg-rose-500 rounded-lg text-white text-md hover:bg-rose-600 active:bg-rose-700" 
								type="button"
								onClick={handleCancel}
							>🚫 Cancel</button>
						</div>
					</Form>
				</> : <>
					<div className="mb-4 text-2xl text-stone-600 cursor-caret" onClick={(e) => setEditing(true)}>{name}</div>
					<div className="text-stone-500 cursor-caret" onClick={(e) => setEditing(true)}>{desc}</div>
					<div className="mt-5 text-right">
						<button
							className="mr-2 px-3 py-2 bg-blue-500 rounded-lg text-white text-md hover:bg-blue-600 active:bg-blue-700"
							onClick={(e) => setEditing(true)}
						>
							✏ Edit
						</button>
						
						<button
							className="px-3 py-2 bg-rose-500 rounded-lg text-white text-md hover:bg-rose-600 active:bg-rose-700"
							onClick={(e) => onDelete(e, furniture.id)}
						>
							🗑️ Delete
						</button>
					</div>
				</>}
			</div>
		</div>
	)
}

const ErrorMsg = ({error, onClick}) => {
	return <div className="py-2 px-4 text-xl text-white bg-red-600 rounded-md max-w-xl cursor-pointer"
		onClick={onClick}
	>
		{error.toString()} ❌
	</div>
}

const Furniture = () => {
	const [furnitures, setFurnitures] = useState([])
	const [error, setError] = useState(null)
	
	const fetchFurnitures = () => {
		getAllFurnitures()
			.then((response) => response.json())
			.then((data) => setFurnitures(data))
	}
	
	const handleDelete = (e, id) => {
		deleteFurniture(id)
			.then(async (r) => {
				if (!r.ok) {
					const body = await r.json()
					throw new Error(body.message !== undefined ? body.message : r.statusText)
				}
				fetchFurnitures()
			})
			.catch((e) => {
				console.log(`Failed to delete furniture (${id}): ${e}`)
				setError(e)
			})
	}
	
	useEffect(() => {
		fetchFurnitures()
	}, [])
	
	const furnitureItems = furnitures.map((furniture, idx) => (
		<FurnitureItem
			furniture={furniture}
			onDelete={handleDelete}
			onUpdate={() => fetchFurnitures()}
			onError={(e) => {
				console.log(`A furniture item (${furniture.id}) failed to update: ${e}`)
				setError(e)
			}}
			key={furniture.id}
		/>
	))
	
	return ( <div className="pt-4 flex flex-col items-center">
		{error ? (<ErrorMsg error={error} onClick={() => setError(null)} />) : null}
		<div className="flex justify-center">
			<div className="w-full max-w-2xl">
				{furnitureItems.length
					? furnitureItems
					: 'Store is out of furniture items!'}
			</div>
		</div>
		</div>
	)
}

export default Furniture
