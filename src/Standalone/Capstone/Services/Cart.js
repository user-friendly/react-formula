
import {default as ApiFetch, processStatus, SESSION_TOKEN_HEADER} from './ApiFetch'

const ApiGetCart = async (sessionData) => {
	try {
		const sessionToken = JSON.stringify(sessionData)
		const r = await ApiFetch('GET', 'cart', {
			[SESSION_TOKEN_HEADER]: sessionToken,
		})
		return processStatus(r)
	} catch (e) {
		console.error('Failed to get cart item list, error:', e)
	}
	return false
}

const ApiAddToCart = async (sessionData, item) => {
	// Dummy data - the uuid param is ignored.
	const uuid = '550e8400-e29b-41d4-a716-446655440000'
	try {
		const sessionToken = JSON.stringify(sessionData)
		const r = await ApiFetch('POST', `cart/${uuid}`, {[SESSION_TOKEN_HEADER]: sessionToken},
			[item]
		)
		return processStatus(r)
	} catch (e) {
		console.error('Failed to get cart item list, error:', e)
	}
	return false
}

const ApiRemoveFromCart = async (sessionData, offset) => {
	try {
		const sessionToken = JSON.stringify(sessionData)
		const r = await ApiFetch('DELETE', `cart/${offset}`, {[SESSION_TOKEN_HEADER]: sessionToken})
		return processStatus(r)
	} catch (e) {
		console.error(`Failed to remove item at {${offset}} from cart list, error:`, e)
	}
	return false
}

const ApiClearCart = async (sessionData) => {
	try {
		const sessionToken = JSON.stringify(sessionData)
		const r = await ApiFetch('DELETE', `cart`, {[SESSION_TOKEN_HEADER]: sessionToken})
		return processStatus(r)
	} catch (e) {
		console.error(`Failed to clear cart item list, error:`, e)
	}
	return false
}

export {ApiGetCart, ApiAddToCart, ApiRemoveFromCart, ApiClearCart}
