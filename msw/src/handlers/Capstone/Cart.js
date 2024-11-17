
import _ from 'lodash'

import {http, delay, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

import {hasAccessTo, getSessionFromRequest} from './Users'

const randomDelay = async (min = 0) => await delay(min + _.random(250, 1000))

// Plants table.
const store = new Map()

// Add some dummy cart items.
store.set('johndoe123', [
	{plant: {
		quantity: 2,
		uuid: '1a1d6735-be08-4d34-9736-2e03da2c9d98',
		pot_color: 'black',
	}},
	{plant: {
		quantity: 1,
		uuid: '4e9482ac-c661-4c77-8755-be50376b12ef',
		pot_color: 'sky',
	}},
	{plant: {
		quantity: 1,
		uuid: '1a1d6735-be08-4d34-9736-2e03da2c9d98',
		pot_color: 'sky',
	}},
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
			for (const item of items) {
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
		http.delete(`${baseUrl}/cart/:offset`, async ({cookies, request, params}) => {
			const {offset} = params
			
			if (!hasAccessTo(request, 'add cart items')) {
				return HttpResponse.json({
						error: 'Access forbidden.',
						code: 2,
					},
					{status: 401}
				)
			}
			
			const session = getSessionFromRequest(request)
			const cartList = store.has(session.username) ? store.get(session.username) : []
			if (cartList[offset] !== undefined) {
				cartList.splice(offset, 1)
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
















