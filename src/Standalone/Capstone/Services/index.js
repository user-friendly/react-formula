
import _ from 'lodash'

import {default as ApiFetch, processStatus, SESSION_TOKEN_HEADER} from './ApiFetch'

const apiCreateUser = async (username, password, passwordConfirm) => {
	const r = await ApiFetch('POST', 'users', null, {
		username:		  username,
		password: 		  password,
		password_confirm: passwordConfirm
	})
	return processStatus(r)
}

const apiLoginUser = async (username, password) => {
	const resp = await ApiFetch('POST', 'users/session', null, {
		username: username,
		password: password,
	})
	const result = processStatus(resp)
	if (_.isString(resp.capstone_session_token)) {
		result.payload = JSON.parse(resp.capstone_session_token)
	}
	return result
}

const apiLogoutUser = async (token) => {
	const resp = await ApiFetch('DELETE', 'users/session', null, token)
	return processStatus(resp)
}

export {apiCreateUser, apiLoginUser, apiLogoutUser, processStatus}
export * from './User'
export * from './Plants'