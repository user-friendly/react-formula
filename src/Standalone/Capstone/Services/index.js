
import _ from 'lodash'

import ApiFetch from './ApiFetch'

const getStatus = (error = false, message = null) => {
	return 	{
		error: error,
		message: message
	}
}

const processResponse = (result) => {
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
	return processResponse(r)
}

const apiLoginUser = async (username, password) => {
	const r = await ApiFetch('POST', 'users/session', {
		username: username,
		password: password,
	})
	return processResponse(r)
}

export {apiCreateUser, apiLoginUser}
