
import {default as ApiFetch, processStatus, SESSION_TOKEN_HEADER} from './ApiFetch'

export const ApiGetPlants = async (sessionData) => {
	try {
		const sessionToken = JSON.stringify(sessionData)
		const r = await ApiFetch('GET', 'plants', {
			[SESSION_TOKEN_HEADER]: sessionToken,
		})
		return processStatus(r)
	} catch (e) {
		console.error('Failed to get plants list.')
	}
	return false
}
