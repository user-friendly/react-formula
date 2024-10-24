import _ from 'lodash'

import {http, HttpResponse} from 'msw'

const ENDPOINT_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/theme-context/breeds`

let store = []

const Breeds = [
	http.get(`${ENDPOINT_BASE_URL}`, ({cookies}) => {
		return HttpResponse.json(store)
	}),
/*	http.put(
		`${ENDPOINT_BASE_URL}/:id`,
		async ({params, cookies, request}) => {
			const id = _.toInteger(params.id)
			const body = await request.json()
			// Returns a reference, so this record can be directly updated.
			const record = store.find((r) => r.id === id)
			
			console.log(record)
			
			let status = 400
			let resp = {
				message: `record (${id}) not found`,
			}

			if (record !== undefined) {
				console.log(`Update record in mock DB, by id ${id}.`)
				
				record.name = body.name
				record.description = body.description
				
				status = 200
				resp.message = `record (${id}) updated`
			} else {
				console.log(`Record not found in mock DB, id ${id}.`)
			}
			return HttpResponse.json(resp, {status: status})
		}
	),
	http.delete(
		`${ENDPOINT_BASE_URL}/:id`,
		async ({params, cookies, request}) => {
			const {id} = params
			const body = await request.json()
			const record = store.find((r) => _.toInteger(r.id) === _.toInteger(id))
			let status = 400
			let resp = {
				message: `record (${id}) not found`,
			}

			if (body.comment !== undefined) {
				console.log(`Deletion comment: ${body.comment}`)
			}

			if (record !== undefined) {
				console.log(`Delete record from mock DB, by id ${id}.`)

				store = store.filter((r) => _.toInteger(r.id) !== _.toInteger(id))

				status = 200
				resp.message = `record (${id}) deleted`
			} else {
				console.log(`Record not found in mock DB, id ${id}.`)
			}
			return HttpResponse.json(resp, {status: status})
		}
	),*/
]

export default Breeds

store = 
[
    {
        "description": "The Labrador Retriever is a friendly and outgoing breed known for its intelligence, loyalty, and versatility, making it a popular choice for families, service work, and outdoor activities. They have a short, dense coat that can be yellow, black, or chocolate, and they typically have a playful and energetic temperament.",
        "id": 34,
        "image_source": "https://static-task-assets.react-formula.com/660141.jpg",
        "name": "Labrador Retriever"
    },
    {
        "description": "The German Shepherd is a large, intelligent, and versatile working dog known for its strength, loyalty, and protective instincts. Originally bred for herding sheep, this breed excels in various roles such as police and military work, search and rescue, and as a devoted family companion.",
        "id": 35,
        "image_source": "https://static-task-assets.react-formula.com/282794.jpg",
        "name": "German Shepherd"
    },
    {
        "description": "The Siberian Husky is a medium-sized working dog known for its striking blue or multicolored eyes, erect triangular ears, and distinctive facial mask. Bred for endurance and strength, they are friendly, outgoing, and energetic, making them great companions for active individuals or families.",
        "id": 36,
        "image_source": "https://static-task-assets.react-formula.com/640976.jpg",
        "name": "Siberian Husky"
    },
    {
        "description": "Greyhounds are elegant, slender dogs known for their incredible speed and agility, often described as 'the fastest dogs on Earth.' They have a gentle and calm demeanor, making them affectionate companions as well as exceptional racing dogs.",
        "id": 37,
        "image_source": "https://static-task-assets.react-formula.com/146393.jpg",
        "name": "Greyhound"
    },
    {
        "description": "The Irish Terrier is a spirited and affectionate breed known for its distinctive red coat and strong, athletic build. Loyal and courageous, they make excellent family pets and are always eager to protect and please their owners.",
        "id": 38,
        "image_source": "https://static-task-assets.react-formula.com/548496.jpg",
        "name": "Irish Terrier"
    },
    {
        "description": "Dachshunds, also known as 'wiener dogs,' are a small breed characterized by their long bodies, short legs, and distinctively playful and lively personalities. Originating from Germany, they were originally bred for hunting small animals like badgers and are known for their courageous and tenacious nature.",
        "id": 39,
        "image_source": "https://static-task-assets.react-formula.com/060360.jpg",
        "name": "Daschund"
    },
    {
        "description": "The Corgi is a small, sturdy dog breed known for its short legs, long body, and distinctive 'fox-like' face. They are intelligent, affectionate, and energetic, making them excellent companions and herding dogs.",
        "id": 40,
        "image_source": "https://static-task-assets.react-formula.com/062785.jpg",
        "name": "Corgi"
    },
    {
        "description": "The Shiba Inu is a small to medium-sized dog breed known for its spirited personality, fox-like appearance, and agile, compact frame. Originating from Japan, Shiba Inus are intelligent, independent, and loyal, making them both charming companions and alert watchdogs.",
        "id": 41,
        "image_source": "https://static-task-assets.react-formula.com/232477.jpg",
        "name": "Shiba Inu"
    }
]

