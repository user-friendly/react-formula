
import _ from 'lodash'

import {http, delay, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

import {hasAccessTo} from './Users'

const randomDelay = async (min = 0) => await delay(min + _.random(250, 1000))

// Plants table.
const store = new Map()

// Add defaults.
store.set('4e9482ac-c661-4c77-8755-be50376b12ef', {
	id: 1,
	name: 'Rose',
	image: '/images/rose.jpeg',
	description: 'It\'s a rose plant.',
})
store.set('1a1d6735-be08-4d34-9736-2e03da2c9d98', {
	id: 2,
	name: 'Succulent',
	image: '/images/succulent.jpeg',
	description: 'It\'s a succulent plant.',
})

const Plants = (baseUrl) => {
	return [
		http.get(`${baseUrl}/plants`, async ({cookies, request}) => {
			
			await randomDelay()
			
			if (!hasAccessTo(request, 'get plants list')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 7,
					},
					{status: 401}
				)
			}
			
			return HttpResponse.json(
				{
					data: Array.from(store.values()),
					code: 0,
				},
				{status: 200}
			)
		}),
		http.post(`${baseUrl}/plants`, async ({cookies, request}) => {
			let newPlant = await request.json()
			const sessionToken = request.headers.get()
			
			await randomDelay()
			
			if (!hasAccessTo(request, 'get plants list')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 6,
					},
					{status: 401}
				)
			}
			
			// 2 chars min?
			if (newPlant.name === undefined || 2 > newPlant.name.length) {
				return HttpResponse.json({
						error: 'Plant name is invalid',
						code: 1,
					},
					{status: 400}
				)
			}
			
			if (newPlant.image === undefined) {
				return HttpResponse.json({
						error: 'Image is required',
						code: 3,
					},
					{status: 400}
				)
			}
			
			newPlant.id = uuidv4()

			newPlant = _.pick(newPlant, ['id', 'name', 'image', 'description'])
			
			console.log('Add new plant to Capstone DB:')
			console.log(newPlant)

			store.set(newPlant.id, newPlant)

			return HttpResponse.json(
				{
					message: 'Plant created successfully.',
					code: 0,
				},
				{status: 201 /* Resource created. */}
			)
		}),
		
	]
}

export default Plants
