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

const createRecord = (record) => {
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
	const [editing, setEditing] = useState(id === false ? true : false)
	
	const handleChecked = (e) => {
		setIsChecked(e.target.checked)
	}
	
	const handleSubmit = (e) => {
		if (id === false) {
			// Partial update only.
			const newRecord = {text: text}
	
			createRecord(newRecord)
				.then((r) => {
					if (onCreate !== undefined) {
						onCreate(r.id, r)
					}
				})
				.catch((e) => console.log(`Failed to create record (${id}): ${e}`))
		}
		else {
			// Partial update only.
			const newData = {text: text}
			
			console.log(`update record data (partial): `)
			console.log(newData)
			
			updateRecord(id, newData)
				.then((r) => {
					if (onUpdate !== undefined) {
						onUpdate(id, newData)
					}
				})
				.catch((e) => console.log(`Failed to update record (${id}): ${e}`))
		}
		
		setEditing(false)
	}
	
	const handleDelete = () => {
		deleteRecord(id)
			.then((r) => {
				if (onDelete !== undefined) {
					onDelete(id)
				}
			})
			.catch((e) => console.log(`Failed to delete record (${id}): ${e}`))
	}
	
	return <div className="flex">
		<input name="completed" type="checkbox" checked={isChecked} onChange={handleChecked} />
		
		{editing ? (
			<Form onSubmit={handleSubmit}>
				<input className="w-40 mx-1 px-2 py-1 border border-neutral-200"
					name="text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
				<button className="mx-1 px-2 py-1" type="submit">✔ Save</button>
			</Form>
		) : (
			<>
				<div className="w-40 mx-1 px-2 py-1">{text}</div>
				<button onClick={(e) => setEditing(true)} type="button">✏</button>
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
		setList([
			...list,
			newRecord,
		])
	}
	
	const refreshList = () => {
		getRecords()
			.then((d) => {
				console.log(d)
				setList(d)
			})
			.catch((e) => console.log(`Failed to get all record ${ids.join(', ')}: ${e}`))
	}
	
	useEffect(() => {
		/*const ids = [541, 505, 506]
		getRecords(ids)
			.then((d) => console.log(d))
			.catch((e) => console.log(`Failed to get record(s) ${ids.join(', ')}: ${e}`))
		
		getRecords(508)
			.then((d) => console.log(d))
			.catch((e) => console.log(`Failed to get record(s) ${ids.join(', ')}: ${e}`))*/
		
		refreshList()
	}, [])
	
	return <div>
		{list.map((r, k) => 
			<TodoItem key={k} record={r} onDelete={refreshList} />
		)}
		<button type="button" onClick={handleAddTodo}>➕ Add Todo</button>
	</div>
}

export default Todo
