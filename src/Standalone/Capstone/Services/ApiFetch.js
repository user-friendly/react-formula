
import _ from 'lodash'

const { VITE_API_BASE_URL, VITE_API_KEY } = import.meta.env
const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/capstone/`
const API_KEY = import.meta.env.VITE_API_KEY !== undefined
	? import.meta.env.VITE_API_KEY
	: 'browser-mock-api-key'

const ApiFetch = async (method, path, headers = {}, body = null) => {
	if (!_.isObject(headers)) {
		headers = {}
	}
	// Using spread operator, later objects' props override eariler ones.
	const options = {
		method,
		credentials: 'same-origin',
		headers: {...headers, ...{
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}},
	}
	
	if (body) {
		options.body = JSON.stringify(body);
	}
	
	let data = false
	try {
		const response = await fetch(ENDPOINT_URL + path, options)
		data = await response.json()
	} catch (e) {
		console.error('failed to get resource', e)
	}
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
}
export {ApiFetchSync}*/

const getStatus = (error = false, message = null) => {
	return 	{
		error: error,
		message: message
	}
}

const processStatus = (result) => {
	const status = getStatus()
	if (_.isObject(result)) {
		// Should always return a failure message.
		if (result.error) {
			status.error = true
			status.message = result.error
		} else if (result.message) {
			status.message = result.message
		// Generic success message.
		} else {
			status.message = 'Success'
		}
		return {...result, ...status}
	}
	return status
}

export const SESSION_TOKEN_HEADER = 'Capstone-Session'
export {processStatus}
export default ApiFetch
