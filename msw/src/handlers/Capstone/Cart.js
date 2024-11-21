
import _ from 'lodash'

import {http, delay, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

import {hasAccessTo, getSessionFromRequest} from './Users'
import {PlantStore} from './Plants'

const randomDelay = async (min = 0) => await delay(min + _.random(250, 1000))

// Plants table.
const store = new Map()

// Add some dummy cart items.
store.set('johndoe123', [
	{
		id: 1,
		plant: {
			quantity: 2,
			uuid: '1a1d6735-be08-4d34-9736-2e03da2c9d98',
			pot_color: 'black',
		}
	},
	{
		id: 2,
		plant: {
			quantity: 1,
			uuid: '4e9482ac-c661-4c77-8755-be50376b12ef',
			pot_color: 'sky',
		}
	},
	{
		id: 3,
		plant: {
			quantity: 1,
			uuid: '1a1d6735-be08-4d34-9736-2e03da2c9d98',
			pot_color: 'sky',
		}
	},
])

const Plants = (baseUrl) => {
	return [
		http.get(`${baseUrl}/cart`, async ({cookies, request}) => {
			
			await randomDelay()
			
			if (!hasAccessTo(request, 'get cart items')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 1,
					},
					{status: 401}
				)
			}
			
			const session = getSessionFromRequest(request)
			
			let cart = []
			if (store.has(session.username)) {
				cart = Array.from(store.get(session.username))
			}
			if (!_.isEmpty(cart)) {
				for (let item of cart) {
					if (!PlantStore.has(item.plant.uuid)) {
						item = null
						continue
					}
					const plant = PlantStore.get(item.plant.uuid)
					const image = plant.images.find((img) => img.pot_color === item.plant.pot_color)
					if (!image) {
						item = null
						continue
					}
					item.plant.name = plant.name
					item.plant.price = plant.price
					item.plant.image = image
				}
				cart = _.compact(cart)
			}
			
			return HttpResponse.json(
				{
					data: cart,
					code: 0,
				},
				{status: 200}
			)
		}),
		// Leave UUID param to keep similar structure to React Formula's API.
		http.post(`${baseUrl}/cart/:uuid`, async ({cookies, request, params}) => {
			const {uuid} = params
			// An array of item(s) to add to cart.
			// Each object is keyed by item type.
			// Example of a plant item:
			// 
			// [{
			// 		plant: {
			// 			uuid: '550e8400-e29b-41d4-a716-446655440000',
			// 			quantity: 1,
			// 			pot_color: 'amber',
			// 		}
			// }]
			//
			const items = await request.json()

			await randomDelay()
			
			if (!hasAccessTo(request, 'add cart items')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 2,
					},
					{status: 401}
				)
			}
			const session = getSessionFromRequest(request)
			
			if (!_.isArray(items) || _.isEmpty(items)) {
				return HttpResponse.json({
						error: 'Invalid request',
						code: 3,
					},
					{status: 200/*401*/}
				)
			}
			
			const cartList = store.has(session.username) ? store.get(session.username) : []
			// Serial id.
			let sid = parseInt(cartList.reduce((id, item) => item.id > id ? item.id : id, 0))
			
			for (const item of items) {
				item.id = ++sid
				cartList.push(item)
			}
			store.set(session.username, cartList)
			
			return HttpResponse.json(
				{
					message: 'Item added to cart successfully.',
					code: 0,
				},
				{status: 200}
			)
		}),
		http.delete(`${baseUrl}/cart`, async ({cookies, request}) => {
			if (!hasAccessTo(request, 'add cart items')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 2,
					},
					{status: 401}
				)
			}
			const session = getSessionFromRequest(request)

			await randomDelay()
			
			// Clears cart.
			store.set(session.username, [])
			
			return HttpResponse.json(
				{
					message: 'Cart cleared successfully',
					code: 0,
				},
				{status: 200}
			)
		}),
		http.delete(`${baseUrl}/cart/:id`, async ({cookies, request, params}) => {
			const id = parseInt(params.id)
			
			await randomDelay()
			
			if (!hasAccessTo(request, 'add cart items')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 2,
					},
					{status: 401}
				)
			}
			
			if (isNaN(id)) {
				return HttpResponse.json({
						error: 'Invalid request',
						code: 3,
					},
					{status: 200/*401*/}
				)
			}
			
			const session = getSessionFromRequest(request)
			const cartList = store.has(session.username) ? store.get(session.username) : []
			const idx = cartList.findIndex((item) => item.id === id )
			if (cartList[idx] !== undefined) {
				cartList.splice(idx, 1)
				store.set(session.username, cartList)
			} else {
				// NOTE Notify user?
			}
			
			return HttpResponse.json(
				{
					message: 'Item removed from cart successfully',
					code: 0,
				},
				{status: 200}
			)
		}),
	]
}

export default Plants
















