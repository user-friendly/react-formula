
import {http, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

const store = new Map()

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
		http.get(`${baseUrl}/users`, ({cookies}) => {
			return HttpResponse.json(Array.from(store.values()))
		}),
		http.post(`${baseUrl}/users`, async ({cookies, request}) => {
			const newUser = await request.json()
			const id = uuidv4()
			
			if (newUser.username === undefined || 3 > newUser.username.length) {
				return HttpResponse.json({
						errror: 'username is invalid',
					},
					{status: 200/*400*/}
				)
			}
			
			if (store.get(newUser.username)) {
				return HttpResponse.json({
						errror: 'username already taken',
					},
					{status: 200/*409*/}
				)
			}
			
			newUser.id = id

			console.log('Add new user to Capstone DB:')
			console.log(newUser)

			store.set(newUser.username, newUser)

			return HttpResponse.json(
				{
					message: 'Sign up successful!',
				},
				{status: 201}
			)
		}),
		
	]
}

export default Users
