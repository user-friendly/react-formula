import {http, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

const users = new Map()

// Add example user.
users.set('c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d', {
	id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
	firstName: 'John',
	lastName: 'Maverick',
})

const example = [
	// Intercept "GET https://example.com/user" requests...
	http.get('https://example.com/user', ({cookies}) => {
		// ...and respond to them using this JSON response.
		return HttpResponse.json(Array.from(users.values()))
	}),
	http.get('https://example.com/user/:id', ({params, cookies}) => {
		let status = 200
		let resp = users.get(params.id)
		if (resp === undefined) {
			status = 400
			resp = {
				message: 'user not found',
			}

			console.log(`User not found in mock DB, id ${id}.`)
		}
		return HttpResponse.json(resp, {status: status})
	}),
	http.post('https://example.com/user', async ({cookies, request}) => {
		const newUser = await request.json()
		const id = uuidv4()

		newUser.id = id

		console.log('Add new user to mock DB:')
		console.log(newUser)

		users.set(newUser.id, newUser)

		return HttpResponse.json(
			{
				message: 'success',
				id: newUser.id,
			},
			{status: 201}
		)
	}),
	http.put(
		'https://example.com/user/:id',
		async ({params, cookies, request}) => {
			const {id} = params
			const newUser = await request.json()
			const user = users.get(id)
			let status = 400
			let resp = {
				message: 'user not found',
			}
			if (user !== undefined) {
				newUser.id = id

				console.log(`Update user from mock DB, by id ${id}.`)
				console.log('Old data: ')
				console.log(user)
				console.log('New data: ')
				console.log(newUser)

				users.set(id, newUser)

				status = 200
				resp.message = 'user updated'
			} else {
				console.log(`User not found in mock DB, id ${id}.`)
			}
			return HttpResponse.json(resp, {status: status})
		}
	),
	http.delete(
		'https://example.com/user/:id',
		async ({params, cookies, request}) => {
			const {id} = params
			const body = await request.json()
			const user = users.get(id)
			let status = 400
			let resp = {
				message: 'user not found',
			}

			if (body.comment !== undefined) {
				console.log(`Deletion comment: ${body.comment}`)
			}

			if (user !== undefined) {
				console.log(`Delete user from mock DB, by id ${id}.`)
				console.log(user)

				users.delete(id)

				status = 200
				resp.message = 'user deleted'
			} else {
				console.log(`User not found in mock DB, id ${id}.`)
			}
			return HttpResponse.json(resp, {status: status})
		}
	),
]

export default example
