import _ from 'lodash'

import {http, HttpResponse} from 'msw'

const ENDPOINT_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/deleting-furni/furnitures`

let store = [
    {
        "description": "A modern sofa with clean lines and comfortable cushions.",
        "id": 973,
        "image": "https://static-task-assets.react-formula.com/045887.jpg",
        "name": "Sleek Sofa"
    },
    {
        "description": "A stylish coffee table with a sleek glass top and metal legs.",
        "id": 974,
        "image": "https://static-task-assets.react-formula.com/737710.jpg",
        "name": "Contemporary Coffee Table"
    },
    {
        "description": "A compact bedside table perfect for keeping your essentials within reach.",
        "id": 975,
        "image": "https://static-task-assets.react-formula.com/224305.jpg",
        "name": "Cozy Bedside Table"
    },
    {
        "description": "A sturdy dining chair crafted from reclaimed wood for a rustic look.",
        "id": 976,
        "image": "https://static-task-assets.react-formula.com/243572.jpg",
        "name": "Rustic Dining Chair"
    },
    {
        "description": "A minimalist desk with ample storage space for a clutter-free workspace.",
        "id": 977,
        "image": "https://static-task-assets.react-formula.com/821040.jpg",
        "name": "Modern Desk"
    },
    {
        "description": "An elegant bed frame with a stylish headboard and footboard.",
        "id": 978,
        "image": "https://static-task-assets.react-formula.com/577877.jpg",
        "name": "Elegant Bed Frame"
    },
    {
        "description": "A classic wardrobe with drawers and hanging space for organized storage.",
        "id": 979,
        "image": "https://static-task-assets.react-formula.com/340930.jpg",
        "name": "Classic Wardrobe"
    },
    {
        "description": "A sleek dining table perfect for hosting family meals or dinner parties.",
        "id": 980,
        "image": "https://static-task-assets.react-formula.com/732720.jpg",
        "name": "Sleek Dining Table"
    },
    {
        "description": "A comfortable recliner for relaxing and unwinding after a long day.",
        "id": 981,
        "image": "https://static-task-assets.react-formula.com/566280.jpg",
        "name": "Lounge Recliner"
    }
]

const DeletingFurni = [
	http.get(`${ENDPOINT_BASE_URL}`, ({cookies}) => {
		return HttpResponse.json(store)
	}),
	http.delete(`${ENDPOINT_BASE_URL}/:id`, async ({params, cookies, request}) => {
		const {id} = params
		const body = await request.json()
		const record = store.find(r => _.toInteger(r.id) === _.toInteger(id));
		let status = 400
		let resp = {
			message: `record (${id}) not found`,
		}

		/*if (body.comment !== undefined) {
			console.log(`Deletion comment: ${body.comment}`)
		}*/

		if (record !== undefined) {
			console.log(`Delete record from mock DB, by id ${id}.`)
			
			store = store.filter(r => _.toInteger(r.id) !== _.toInteger(id))
			
			status = 200
			resp.message = `record (${id}) deleted`
		} else {
			console.log(`Record not found in mock DB, id ${id}.`)
		}
		return HttpResponse.json(resp, {status: status})
	}),
]

export default DeletingFurni
