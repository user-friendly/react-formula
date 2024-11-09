
const CAPSTONE_SESSION_TOKEN_KEY = 'capstone_session_token'

export const setSessionStorage = (capstoneSession) => {
	try {
		localStorage.setItem(CAPSTONE_SESSION_TOKEN_KEY, JSON.stringify(capstoneSession))
		return true
	} catch (e) {
		console.error(e)
	}
	return false
}

export const getSessionStorage = () => {
	try {
		return JSON.parse(localStorage.getItem(CAPSTONE_SESSION_TOKEN_KEY))
	} catch (e) {
		// Something went wrong, silently clean up the mess.
		removeSessionStorage()
	}
	return false
}

export const removeSessionStorage = () => localStorage.removeItem(CAPSTONE_SESSION_TOKEN_KEY)
