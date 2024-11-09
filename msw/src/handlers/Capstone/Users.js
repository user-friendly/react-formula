
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
		id: session.id,
		username: session.username
	}
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
			
			// TODO Handle case for existing session.
			//		This might be important for security reasons!!!
			
			if (!createSession(user.username)) {
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

export default Users