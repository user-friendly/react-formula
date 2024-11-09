
import _ from 'lodash'

import ApiFetch from './ApiFetch'

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
	}
	return status
}

const apiCreateUser = async (username, password, passwordConfirm) => {
	const r = await ApiFetch('POST', 'users', {
		username:		  username,
		password: 		  password,
		password_confirm: passwordConfirm
	})
	return processStatus(r)
}

const apiLoginUser = async (username, password) => {
	const resp = await ApiFetch('POST', 'users/session', {
		username: username,
		password: password,
	})
	const result = processStatus(resp)
	if (_.isString(resp.capstone_session_token)) {
		result.payload = JSON.parse(resp.capstone_session_token)
	}
	return result
}

export {apiCreateUser, apiLoginUser}
export * from './User'
