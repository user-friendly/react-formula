
const { VITE_API_BASE_URL, VITE_API_KEY } = import.meta.env

const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/capstone/`
const API_KEY = import.meta.env.VITE_API_KEY !== undefined
	? import.meta.env.VITE_API_KEY
	: 'browser-mock-api-key'

const ApiFetch = async (method, path, body = null) => {
	const options = {
		method,
		credentials: 'same-origin',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
		},
	}
	
	if (body) {
		options.body = JSON.stringify(body);
	}
	
	const response = await fetch(ENDPOINT_URL + path, options)
	const data = await response.json()
	return data
}

/*const ApiFetchSync = (method, path, body = null) => {
	const xhr = new XMLHttpRequest()
	
	// Pass false to 3rd arg, to disable async.
	xhr.open(method, ENDPOINT_URL + path, false)
	// Default should be the same as fetch's window.fetch()'s credentials option.
	// xhr.withCredentials = false
	xhr.setRequestHeader('Authorization', `Bearer ${API_KEY}`)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send(body)
	
	if (xhr.status === 200) {
		return JSON.parse(xhr.responseText)
	} else {
		throw new Error(`Request failed with status ${xhr.status}`)
	}
}*/

export {ApiFetchSync}
export default ApiFetch
