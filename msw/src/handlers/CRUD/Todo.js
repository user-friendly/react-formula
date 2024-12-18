import _ from 'lodash'

import {http, HttpResponse} from 'msw'

const ENDPOINT_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/todo-list/todos`

let store = [
    {
		"id": 541,
        "complete": false,
        "text": "6555"
    },
    {
		"id": 505,
        "complete": true,
        "text": "feed the cats"
    },
    {
		"id": 506,
        "complete": true,
        "text": "buy milk and eggs"
    },
    {
		"id": 507,
        "complete": false,
        "text": "learn react"
    },
    {
		"id": 508,
        "complete": false,
        "text": "this is a test"
    },
]

const updateable = ['text', 'complete']

const Todo = [
	http.get(`${ENDPOINT_BASE_URL}`, ({cookies}) => {
		return HttpResponse.json(store)
	}),
	http.get(`${ENDPOINT_BASE_URL}/:ids`, ({params, cookies}) => {
		const ids = params.ids.split(',').map(v => _.toInteger(v))
		const records = store.filter(r => ids.some(id => id === r.id))
		return HttpResponse.json(records)
	}),
	http.post(
		`${ENDPOINT_BASE_URL}`,
		async ({params, cookies, request}) => {
			const body = await request.json()
			
			/*// A bit of validation first.
			if (body.text === undefined || !_.trim(body.text).length) {
				return HttpResponse.json(body, {
					status: 400,
					message: 'Text field must not be empty.'
				})
			}*/
			
			const nextId = _.toInteger(_.maxBy(store, 'id').id + 1)
			const record = {id: nextId}
			
			for (const field of _.intersection(updateable, _.keys(body))) {
				record[field] = body[field]
			}
			
			if (record.text === undefined) {
				record.text = ''
			}
			if (record.complete === undefined) {
				record.complete = false
			}
			
			store.push(record)

			console.log(`Created a new record in mock DB, by id ${record.id}.`)
			
			return HttpResponse.json(record, {status: status})
		}
	),
	http.put(
		`${ENDPOINT_BASE_URL}/:id`,
		async ({params, cookies, request}) => {
			const id = _.toInteger(params.id)
			const body = await request.json()
			// Returns a reference, so this record can be directly updated.
			const record = store.find((r) => r.id === id)
			
			let status = 400
			let resp = {
				message: `record (${id}) not found`,
			}

			if (record !== undefined) {
				console.log(`Update record in mock DB, by id ${id}.`)
				
				for (const field of _.intersection(updateable, _.keys(body))) {
					record[field] = body[field]
				}
				
				status = 200
				resp.message = `record (${id}) updated`
			} else {
				console.log(`Record not found in mock DB, id ${id}.`)
			}
			return HttpResponse.json(resp, {status: status})
		}
	),
	http.delete(
		`${ENDPOINT_BASE_URL}/:id`,
		async ({params, cookies, request}) => {
			const {id} = params
			// const body = await request.json()
			const record = store.find((r) => _.toInteger(r.id) === _.toInteger(id))
			let status = 400
			let resp = {
				message: `record (${id}) not found`,
			}

			/*if (body.comment !== undefined) {
				console.log(`Deletion comment: ${body.comment}`)
			}*/

			if (record !== undefined) {
				console.log(`Delete record from mock DB, by id ${id}.`)

				store = store.filter((r) => _.toInteger(r.id) !== _.toInteger(id))

				status = 200
				resp.message = `record (${id}) deleted`
			} else {
				console.log(`Record not found in mock DB, id ${id}.`)
			}
			return HttpResponse.json(resp, {status: status})
		}
	),
]

export default Todo
