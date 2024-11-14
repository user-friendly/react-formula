
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
	uuid: '4e9482ac-c661-4c77-8755-be50376b12ef',
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
	description: "A rose plant stands as a timeless symbol of beauty, adorned with lush green leaves that cradle its delicate blossoms. Each flower, with petals that unfurl like soft velvet, can range in color from the deepest crimson to the palest pink, exuding an enchanting fragrance that lingers in the air. Sturdy, thorn-lined stems reach skyward, embodying both elegance and resilience. The rose's blooms, catching the light of day, appear almost luminous, captivating those who behold them with their intricate layers and subtle gradients. This plant, thriving in gardens and wild meadows alike, evokes romance, admiration, and the unyielding spirit of nature.",
	botanical_name: "Rosa 'Bonica'",
	price: 24.59,
})
store.set('1a1d6735-be08-4d34-9736-2e03da2c9d98', {
	id: 2,
	uuid: '1a1d6735-be08-4d34-9736-2e03da2c9d98',
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
	description: "A succulent plant is a marvel of adaptation, with fleshy, water-storing leaves that glisten like polished jade under the sun. Each leaf, often plump and geometric, seems crafted to catch and conserve even the faintest traces of moisture. These resilient plants come in a palette of greens, silvers, and purples, sometimes edged with pink or red, adding a touch of vibrancy to their stoic forms. Their compact, rosette-shaped growth exudes an effortless elegance, while some varieties sprout delicate, star-shaped flowers that float like tiny bursts of color above the sturdy foliage. Succulents thrive in arid landscapes and sun-dappled windowsills alike, embodying a quiet, enduring beauty.",
	botanical_name: 'Crassula ovata',
	price: 13.37,
})
store.set('812bcf9c-62d6-497e-a686-34c044a21ee9', {
	id: 3,
	uuid: '812bcf9c-62d6-497e-a686-34c044a21ee9',
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
	description: "Siberian Scilla, with its dainty, star-like blooms, paints the landscape in vivid shades of blue during early spring. Each slender stem rises gracefully from a tuft of dark green, strap-shaped leaves, holding clusters of bell-shaped flowers that nod gently in the breeze. The petals, often a striking cobalt or sky blue, sometimes feature delicate streaks of darker hues that draw the eye toward the flower’s pale, stamen-centered heart. Hardy and resilient, the Siberian Scilla flourishes in meadows, gardens, and woodlands, casting a sea of color that heralds the end of winter's chill and the start of nature's renewal.",
	botanical_name: 'Scilla siberica',
	price: 16.89,
})



const Plants = (baseUrl) => {
	return [
		http.get(`${baseUrl}/plants`, async ({cookies, request}) => {
			
			await randomDelay(500)
			
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
		http.get(`${baseUrl}/plant/:uuid`, async ({cookies, request, params}) => {
			const {uuid} = params
			
			await randomDelay()
			
			if (!store.has(uuid)) {
				return HttpResponse.json({
						error: 'Plant not found.',
						code: 1,
					},
					{status: 404}
				)
			}

			// FIXME Remove! 
			return HttpResponse.json(
				{
					data: store.get(uuid),
					code: 0,
				},
				{status: 200}
			)
			
			if (!hasAccessTo(request, 'get plant data')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 1,
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
