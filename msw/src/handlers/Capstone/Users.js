
import _ from 'lodash'

import {http, delay, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

const randomDelay = async (min = 0) => await delay(min + _.random(250, 1000))

// Users table.
const store = new Map()
// Sessions table.
const session = new Map()

// Add default user.
store.set('userfriendly', {
	id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
	username: 'userfriendly',
	password: '123',
})
store.set('johndoe123', {
	id: '81569584-5286-42f1-9d01-92914aa2e8c9',
	username: 'johndoe123',
	password: '123',
})

const Users = (baseUrl) => {
	return [
		http.post(`${baseUrl}/users/session`, async ({cookies, request}) => {
			const login = await request.json()
			
			await randomDelay()
			
			if (_.isEmpty(login.username)) {
				return HttpResponse.json({
						error: 'You must supply a username',
						code: 5,
					},
					{status: 200/*401*/}
				)
			}
			
			if (_.isEmpty(login.password)) {
				return HttpResponse.json({
						error: 'You must supply a password',
						code: 6,
					},
					{status: 200/*401*/}
				)
			}
			
			const user = store.get(login.username)
			
			if (!user) {
				return HttpResponse.json({
						error: 'Username not found',
						code: 7,
					},
					{status: 200/*404*/}
				)
			}
			
			// Usually, these values would be hashed?
			if (login.password !== user.password) {
				return HttpResponse.json({
						error: 'Invalid password',
						code: 8,
					},
					{status: 200/*401*/}
				)
			}
			
			// TODO Do some session stuff here.
			//		Check if user is already loggedin.
			
			return HttpResponse.json({
					message: 'Sign in successful!',
					code: 4,
				},
				{status: 200}
			)
		}),
		http.get(`${baseUrl}/users`, async ({cookies}) => {
			
			await randomDelay()
			
			return HttpResponse.json(Array.from(store.values()))
		}),
		http.post(`${baseUrl}/users`, async ({cookies, request}) => {
			const newUser = await request.json()
			const id = uuidv4()
			
			await randomDelay()
			
			if (newUser.username === undefined || 3 > newUser.username.length) {
				return HttpResponse.json({
						error: 'Username is invalid',
						code: 1,
					},
					{status: 200/*400*/}
				)
			}

			if (store.get(newUser.username)) {
				return HttpResponse.json({
						error: 'Username already taken',
						code: 3,
					},
					{status: 200/*409*/}
				)
			}
			
			if (newUser.password === undefined || 3 > newUser.password.length) {
				return HttpResponse.json({
						error: 'Password is invalid',
						code: 2,
					},
					{status: 200/*400*/}
				)
			}
			
			if (newUser.password_confirm !== undefined) {
				if (newUser.password !== newUser.password_confirm) {
					return HttpResponse.json({
							error: 'Password confirm mismatch',
							code: 2,
						},
						{status: 200/*400*/}
					)
				}
				delete newUser.password_confirm
			}
			
			newUser.id = id

			console.log('Add new user to Capstone DB:')
			console.log(newUser)

			store.set(newUser.username, newUser)

			return HttpResponse.json(
				{
					message: 'Sign up successful!',
					code: 0,
				},
				{status: 201 /* Resource created. */}
			)
		}),
		
	]
}

export default Users
