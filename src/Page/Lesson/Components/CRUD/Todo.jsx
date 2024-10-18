/**
 * Todo lessons.
 */

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

const Todo = () => {
	useEffect(() => {
		const ids = [541, 505, 506]
		getRecords(ids)
			.then((d) => console.log(d))
			.catch((e) => console.log(`Failed to get record(s) ${ids.join(', ')}: ${e}`))
		
		getRecords(508)
			.then((d) => console.log(d))
			.catch((e) => console.log(`Failed to get record(s) ${ids.join(', ')}: ${e}`))
		
		getRecords()
			.then((d) => console.log(d))
			.catch((e) => console.log(`Failed to get all record ${ids.join(', ')}: ${e}`))
	}, [])
	
	return <div>
		[Todo Lesson]
	</div>
}

export default Todo
