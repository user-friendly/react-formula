
import _ from 'lodash'

import {http, delay, HttpResponse} from 'msw'
import {v4 as uuidv4} from 'uuid'

const randomDelay = async (min = 0) => await delay(min + _.random(250, 1000))

// Users table.
const store = new Map()
// Sessions table.
const sessions = new Map()

// Add default user.
store.set('userfriendly', {
	id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
	username: 'userfriendly',
	password: '123',
})
store.set('johndoe123', {
	id: '81569584-5286-42f1-9d01-92914aa2e8c9',
	username: 'johndoe123',
	password: '123',
})

// Minutes * seconds * milliseconds.
const sessionMaxAge = 16*60*1000

// Create session for a given user.
const createSession = (username) => {
	const user = store.get(username)
	const now = Date.now()
	
	if (!user) {
		return false
	}
	
	const session = {
		id: uuidv4(),
		created: now,
		expires: now + sessionMaxAge,
		uid: user.id,
		username: user.username
	}
	
	sessions.set(user.username, session)
	
	console.log(`Created new session {${session.id}} for user {${username}}, expires at {${(new Date(session.expires)).toUTCString()}}.`)
	
	return true
}

/**
 * Get active user session.
 * 
 * If the session expired, invalidate it (by deleting it)
 * and return false.
 */
const getSession = (username) => {
	if (!sessions.has(username)) {
		return false
	}
	const session = sessions.get(username)
	
	if (session.expires < Date.now()) {
		console.log(`Session {${session.id}} for user {${username}} expired, expiration date ${(new Date(session.expires)).toUTCString()}.`)
		// Invalidate session.
		sessions.delete(username)
		return false
	}
	
	return session
}

const deleteSession = (username) => {
	if (!sessions.has(username)) {
		return false
	}
	sessions.delete(username)
	return true
}

// Creates a client token from a session, by id.
const createClientToken = (username) => {
	// No tokens can be given for non-existing session.
	if (!sessions.has(username)) {
		console.log(`No session for {${username}} found in session store.`)
		return false
	}
	
	const session = sessions.get(username)
	
	// No tokens can be given for non-existing users.
	if (!store.has(session.username)) {
		console.log(`No user found for {${session.username}}.`)
		return false
	}
	// No tokens can be given for expired sessions.
	if (session.expires < Date.now()) {
		console.log(`Session found for {${session.username}}, but session expired, expiration date ${(new Date(session.expires)).toUTCString()}.`)
		return false
	}
	return {
		sid: session.id,
		username: session.username,
		// Right now, secret is not used. It's just for show.
		secret: _.random(0, Number.MAX_SAFE_INTEGER)
	}
}

// Fetch API's Headers class (request.headers) matches name ignoring case.
const SESSION_TOKEN_HEADER = 'Capstone-Session'

/**
 * Get cloned session associated with request.
 * 
 * If the session is not valid (for any reason), returns false.
 */
const getSessionFromRequest = (request) => {
	if (!request.headers.has(SESSION_TOKEN_HEADER)) {
		return false
	}
	let reqSession = null
	try {
		reqSession = JSON.parse(request.headers.get(SESSION_TOKEN_HEADER))
		console.log(`Got session token data:`, reqSession)
	} catch (e) {
		console.error(`Failed to decode session token. Error:`, e)
		return false
	}
	if (!_.isObject(reqSession)) {
		console.log(`Invalid session token.`)
		return false
	}
	if (!(_.isString(reqSession.username) && reqSession.username.length && sessions.has(reqSession.username))) {
		console.log(`No session found for user {${reqSession.username}}.`)
		return false
	}
	const session = sessions.get(reqSession.username)
	if (session.id !== reqSession.sid) {
		console.log(`Session id mismatch, user {${reqSession.username}}.`)
		return false
	}
	// Pointless, jsut for show.
	if (/*session.sercret !== */reqSession.secret) {
		console.log(`User {${reqSession.username}} has session token secret {${reqSession.secret}}`)
		//console.log(`${revoke_dbg_msg} - secret mismatch.`)
		//return false
	}
	return _.clone(session)
}

const hasAccessTo = (request, resource) => {
	const session = getSessionFromRequest(request)
	// TODO Implement roles.
	if (_.isString(resource) && session.username !== undefined) {
		console.log(`Grant {${resource}} access to {${session.username}}.`)
		return true
	}
	if (session.username) {
		console.log(`Revoke {${resource}} access to {${session.username}}.`)
	} else {
		console.log(`Revoke {${resource}} access to {unknown}.`)
	}
	return false
}

const Users = (baseUrl) => {
	return [
		http.post(`${baseUrl}/users/session`, async ({cookies, request}) => {
			const login = await request.json()
			
			await randomDelay()
			
			if (_.isEmpty(login.username)) {
				return HttpResponse.json({
						error: 'You must supply a username',
						code: 5,
					},
					{status: 200/*401*/}
				)
			}
			
			if (_.isEmpty(login.password)) {
				return HttpResponse.json({
						error: 'You must supply a password',
						code: 6,
					},
					{status: 200/*401*/}
				)
			}
			
			const user = store.get(login.username)
			
			if (!user) {
				return HttpResponse.json({
						error: 'Username not found',
						code: 7,
					},
					{status: 200/*404*/}
				)
			}
			
			// Usually, these values would be hashed?
			if (login.password !== user.password) {
				return HttpResponse.json({
						error: 'Invalid password',
						code: 8,
					},
					{status: 200/*401*/}
				)
			}
			
			if (!getSession(user.username) && !createSession(user.username)) {
				return HttpResponse.json({
						error: 'Internal server error.',
						code: 9,
					},
					{status: 500}
				)
			}
			
			const token = createClientToken(user.username)
			if (!token) {
				return HttpResponse.json({
						error: 'Internal server error.',
						code: 10,
					},
					{status: 500}
				)
			}
			
			return HttpResponse.json({
					message: 'Sign in successful!',
					capstone_session_token: JSON.stringify(token),
					code: 0,
				},
				{status: 200}
			)
		}),
		http.delete(`${baseUrl}/users/session`, async ({cookies, request}) => {
			const token = await request.json()
			let username = false
			
			await randomDelay()
			
			if (_.has(token, 'username') && store.has(token.username)) {
				username = token.username
			}
			const session = getSession(username)
			
			// TODO Secret checks out?
			if (session && session.username === username && token.sercret) {
				console.log(`Delete user {${username}} session, logs them out.`)
				deleteSession(username)
				/*return HttpResponse.json({
						message: 'Sign out successful.',
						code: 0,
					},
					{status: 200}
				)*/
			}
			// Throw off the bots?
			return HttpResponse.json({
					message: 'Sign out successful.',
					code: 0,
				},
				{status: 200}
			)
		}),
		http.get(`${baseUrl}/users`, async ({cookies}) => {
			
			await randomDelay()
			
			return HttpResponse.json(Array.from(store.values()))
		}),
		http.post(`${baseUrl}/users`, async ({cookies, request}) => {
			const newUser = await request.json()
			const id = uuidv4()
			
			await randomDelay()
			
			if (newUser.username === undefined || 3 > newUser.username.length) {
				return HttpResponse.json({
						error: 'Username is invalid',
						code: 1,
					},
					{status: 200/*400*/}
				)
			}

			if (store.get(newUser.username)) {
				return HttpResponse.json({
						error: 'Username already taken',
						code: 2,
					},
					{status: 200/*409*/}
				)
			}
			
			if (newUser.password === undefined || 3 > newUser.password.length) {
				return HttpResponse.json({
						error: 'Password is invalid',
						code: 3,
					},
					{status: 200/*400*/}
				)
			}
			
			if (newUser.password_confirm !== undefined) {
				if (newUser.password !== newUser.password_confirm) {
					return HttpResponse.json({
							error: 'Password confirm mismatch',
							code: 4,
						},
						{status: 200/*400*/}
					)
				}
				delete newUser.password_confirm
			}
			
			newUser.id = id

			console.log('Add new user to Capstone DB:')
			console.log(newUser)

			store.set(newUser.username, newUser)

			return HttpResponse.json(
				{
					message: 'Sign up successful!',
					code: 0,
				},
				{status: 201 /* Resource created. */}
			)
		}),
		
	]
}

export {hasAccessTo, getSessionFromRequest}
export default Users
