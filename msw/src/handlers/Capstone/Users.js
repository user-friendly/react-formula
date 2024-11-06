
import {http, HttpResponse} from 'msw'

const store = new Map()

// Add example user.
store.set('c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d', {
	id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
	firstName: 'John',
	lastName: 'Doe',
})
store.set('81569584-5286-42f1-9d01-92914aa2e8c9', {
	id: '81569584-5286-42f1-9d01-92914aa2e8c9',
	firstName: 'Jane',
	lastName: 'Doe',
})

const Users = (baseUrl) => {
	return [
		http.get(`${baseUrl}/users`, ({cookies}) => {
			return HttpResponse.json(Array.from(store.values()))
		}),
	]
}

export default Users
