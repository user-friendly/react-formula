import node from './node'

// Start the mock API server.
node.listen()

async function test_GetUser(id = '') {
	const r = await fetch('https://example.com/user/' + id)
	return await r.json()
}

async function test_CreateUser(user) {
	const req = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	}
	const resp = await fetch('https://example.com/user', req)
	return await resp.json()
}

async function test_DeleteUser(id, comment) {
	const req = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({comment: comment}),
	}
	const resp = await fetch(`https://example.com/user/${id}`, req)
	return await resp.json()
}

// This is a simple Node.js application that
// does a network request and prints the response.
async function testSuit() {
	let lastCreatedUserId = 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d'
	let newUser = {
		firstName: 'Albert',
		lastName: 'Dilbertov',
	}

	let resp = await test_GetUser()
	console.log('test: get user list: ')
	console.log(resp)
	console.log()

	resp = await test_GetUser(lastCreatedUserId)
	console.log('test: get user, specific: ')
	console.log(resp)
	console.log()

	console.log('test: create user, newUser: ')
	console.log(newUser)
	resp = await test_CreateUser(newUser)
	console.log('\tresponse: ')
	console.log(resp)
	console.log()

	if (resp.id === undefined) {
		console.log('failed to create newUser, abort')
		return
	}

	lastCreatedUserId = resp.id

	resp = await test_GetUser(lastCreatedUserId)
	console.log('test: get last created user: ')
	console.log(resp)
	console.log()

	console.log(`test: delete user, by id: ${lastCreatedUserId}`)
	resp = await test_DeleteUser(lastCreatedUserId, 'BAAANNED!!!')
	console.log('\tresponse: ')
	console.log(resp)
	console.log()

	console.log('test: create user, newUser: ')
	console.log(newUser)
	resp = await test_CreateUser(newUser)
	console.log('\tresponse: ')
	console.log(resp)
	console.log()

	resp = await test_GetUser()
	console.log('test: get user list: ')
	console.log(resp)
	console.log()
}

testSuit()
