
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
	images: [
		{
			pot_color: 'amber',
			src: '/images/rose-amber-600.jpeg',
		},
		{
			pot_color: 'white',
			src: '/images/rose-gray-50.jpeg',
		},
		{
			pot_color: 'black',
			src: '/images/rose-gray-600.jpeg',
		},
		{
			pot_color: 'sky',
			src: '/images/rose-sky-700.jpeg',
		},
		{
			pot_color: 'slate',
			src: '/images/rose-slate-300.jpeg',
		},
		{
			pot_color: 'stone',
			src: '/images/rose-stone-200.jpeg',
		},
	],
	description: 'It\'s a rose plant.',
	price: 24.59,
})
store.set('1a1d6735-be08-4d34-9736-2e03da2c9d98', {
	id: 2,
	name: 'Succulent',
	images: [
		{
			pot_color: 'white',
			src: '/images/succulent-gray-50.jpeg',
		},
		{
			pot_color: 'black',
			src: '/images/succulent-gray-600.jpeg',
		},
		{
			pot_color: 'sky',
			src: '/images/succulent-sky-700.jpeg',
		},
	],
	description: 'It\'s a succulent plant.',
	price: 13.37,
})
store.set('812bcf9c-62d6-497e-a686-34c044a21ee9', {
	id: 3,
	name: 'Siberian Scilla',
	images: [
		{
			pot_color: 'amber',
			src: '/images/siberian-scilla-amber-600.jpeg',
		},
		{
			pot_color: 'slate',
			src: '/images/siberian-scilla-slate-300.jpeg',
		},
		{
			pot_color: 'stone',
			src: '/images/siberian-scilla-stone-200.jpeg',
		},
	],
	description: 'It\'s a succulent plant.',
	price: 16.89,
})



const Plants = (baseUrl) => {
	return [
		http.get(`${baseUrl}/plants`, async ({cookies, request}) => {
			
			// await randomDelay()
			
			let data = Array.from(store.values())
			const delta = data.length
			
			const dummySize = 30
			if (data.length < dummySize) {
				for (let i = 3; i < dummySize; i++) {
					const newPlant = _.clone(data[i % delta])
					newPlant.id = data[i-1] + 1
					data.push(newPlant)
				}
				data.forEach((plant, i) => {
					plant.id = i > 2 ? data[i-1].id + 1 : plant.id
				})
			}
			data = _.shuffle(data)
			
			// FIXME Remove!
			return HttpResponse.json(
				{
					data: data,
					code: 0,
				},
				{status: 200}
			)
			
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
