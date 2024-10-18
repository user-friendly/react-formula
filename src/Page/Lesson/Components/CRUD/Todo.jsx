/**
 * Todo lessons.
 */

import _ from 'lodash'

import {useState, useEffect} from 'react'

import Form from '#Components/Form'

const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/todo-list/todos`

const getRecords = (ids = []) => {
	const params = Array.isArray(ids) ? ids.join(',') : ids
	let endpoint = ENDPOINT_URL
	if (params) {
		endpoint = `${ENDPOINT_URL}/${params}`
	}
	return fetch(endpoint)
		.then((r) => {
			if (!r.ok) {
				throw new Error(r.statusText)
			}
			return r.json()
		})
}

const createRecord = (record = {}) => {
	return fetch(`${ENDPOINT_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(record)
		})
		.then((r) => {
			if (!r.ok) {
				throw new Error(r.statusText)
			}
			return r.json()
		})
}

const updateRecord = (id, data) => {
	return fetch(`${ENDPOINT_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then((r) => {
			if (!r.ok) {
				throw new Error(r.statusText)
			}
			return r.json()
		})
}

const deleteRecord = (id) => {
	return fetch(`${ENDPOINT_URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((r) => {
			if (!r.ok) {
				throw new Error(r.statusText)
			}
			return r.json()
		})
}

const TodoItem = ({record, onCreate, onUpdate, onDelete}) => {
	const id = record.id
	const [isChecked, setIsChecked] = useState(record.complete)
	const [text, setText] = useState(record.text)
	const [editing, setEditing] = useState(record.isNew === true ? true : false)
	record.isNew = false
	
	const handleChecked = (e) => {
		// Local state update.
		setIsChecked(e.target.checked)
		// Partial remote state update.
		const newData = {complete: e.target.checked}
		updateRecord(id, newData)
			.then((r) => {
				if (onUpdate !== undefined) {
					onUpdate(id, newData)
				}
			})
			.catch((e) => console.log(`Failed to update record (${id}): ${e}`))
	}
	
	const handleSubmit = (e) => {
		// Partial remote update.
		const newData = {text: text}
		updateRecord(id, newData)
			.then((r) => {
				if (onUpdate !== undefined) {
					onUpdate(id, newData)
				}
			})
			.catch((e) => console.log(`Failed to update record (${id}): ${e}`))
		
		setEditing(false)
	}
	
	const handleDelete = () => {
		// Remote delete.
		deleteRecord(id)
			.then((r) => {
				if (onDelete !== undefined) {
					onDelete(id)
				}
			})
			.catch((e) => console.log(`Failed to delete record (${id}): ${e}`))
	}
	
	return <div className="flex w-96 px-3 py-3 my-1 rounded-lg bg-white">
		<input name="completed" type="checkbox" checked={isChecked} onChange={handleChecked} />
		
		{editing ? (
			<Form className="flex-1 flex justify-start items-center" onSubmit={handleSubmit}>
				<input className="flex-1 mx-2 px-2 py-1 rounded-lg border border-neutral-200 text-emerald-600"
					name="text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
				<button className="bg-neutral-100 rounded-lg px-2 py-1" type="submit">✔ Save</button>
			</Form>
		) : (
			<>
				<div className="flex-1 mx-2 px-2 py-1">{text}</div>
				<button className="mr-1" onClick={(e) => setEditing(true)} type="button">✏</button>
				<button onClick={handleDelete} type="button">🗑</button>
			</>
		)}
	</div>
}

const Todo = () => {
	const [list, setList] = useState([])
	
	const handleAddTodo = () => {
		const newRecord = {
			id: false,
			complete: false,
			text: '',
		}
		createRecord()
			.then((r) => {
				// Indicate new record, manual list refresh.
				// It should be flipped to false in the item component.
				r.isNew = true
				setList([...list, r])
			})
			.catch((e) => console.log(`Failed to create record (${id}): ${e}`))
	}
	
	const refreshList = () => {
		getRecords()
			.then((d) => {
				setList(d)
			})
			.catch((e) => console.log(`Failed to get all record ${ids.join(', ')}: ${e}`))
	}
	
	useEffect(() => {
		refreshList()
	}, [])
	
	return <div className="
		flex flex-col justify-center items-center
		h-full bg-gradient-to-br from-rose-600 to-orange-200
		text-lg text-neutral-500
	">
		<div className="p-4 rounded-lg bg-neutral-100 flex flex-col">
			{list.map((r, k) => 
				<TodoItem key={r.id} record={r} onDelete={refreshList} />
			)}
			<button className="mt-2 py-2 font-bold rounded-lg hover:bg-white" type="button" onClick={handleAddTodo}
				>➕ Add Todo</button>
		</div>
	</div>
}

export default Todo
