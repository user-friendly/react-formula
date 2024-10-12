/**
 * Mock Service Worker test view.
 */

import _ from 'lodash'

import {useState, useEffect} from 'react'

import Router from '#Router'
import Spinner from '#Components/Spinner'

import {default as MswBrowser} from '/msw/src/browser'

const ENDPOINT_BASE_URL = 'https://example.com/user'

const getRandomName = () => {
	return _.sample([
		['Ima', 'Pigg'],
		['Al', 'Dente'],
		['Anita', 'Bath'],
		['Justin', 'Time'],
		['Sue', 'Flay'],
		['Barry', 'Cuda'],
		['Paige', 'Turner'],
		['Sal', 'Monella'],
		['Hugh', 'Jass'],
		['Stan', 'Dupp'],
		['Rick', "O'Shea"],
		['Ben', 'Dover'],
		['Ella', 'Vator'],
		['Drew', 'Peacock'],
		['Wally', 'B. Oats'],
		['Terry', 'Bull'],
	])
}

const getNewUser = () => {
	const [first, last] = getRandomName()
	return {
		id: -1,
		firstName: first,
		lastName: last,
	}
}

const Button = (props) => {
	const extrastyles = props.extrastyles !== undefined ? props.extrastyles : ''
	return (
		<button
			className={`mx-1 px-3 py-1 rounded-xl bg-orange-300 cursor-pointer
		disabled:bg-gray-300 disabled:text-gray-500 active:bg-orange-400 shadow-md ${extrastyles}`}
			{...props}
		>
			{props.children}
		</button>
	)
}

const UserCard = (props) => {
	const handleUpdate = props.handleUpdate
	const handleDelete = props.handleDelete

	return (
		<div className="m-2 p-4 w-96 flex flex-col rounded-xl bg-orange-300">
			<span>{props.id}</span>

			<div className="flex">
				<span className="w-24">First name: </span>
				<span>{props.firstName}</span>
			</div>

			<div className="flex">
				<span className="w-24">Last name: </span>
				<span>{props.lastName}</span>
			</div>

			<div className="flex justify-end">
				{_.isFunction(handleUpdate) ? (
					<Button
						onClick={props.handleUpdate}
						extrastyles="border border-orange-400"
					>
						Update
					</Button>
				) : null}
				{_.isFunction(handleDelete) ? (
					<Button
						onClick={props.handleDelete}
						extrastyles="border border-orange-400"
					>
						Delete
					</Button>
				) : null}
			</div>
		</div>
	)
}

async function fetchUserList(handler) {
	try {
		const r = await fetch(ENDPOINT_BASE_URL)
		if (!r.ok) {
			throw new Error(r.statusText)
		}
		return await r.json()
	} catch (e) {
		throw e
	}
	// TODO This is no good.
	throw Error('reached the end of the function!')
}

async function postUser(newUser) {
	try {
		const r = await fetch(ENDPOINT_BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
		if (!r.ok) {
			throw new Error(r.statusText)
		}
		return await r.json()
	} catch (e) {
		throw e
	}
	// TODO This is no good.
	throw Error('reached the end of the function!')
}

async function updateUser(id, newUser) {
	try {
		const r = await fetch(`${ENDPOINT_BASE_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
		if (!r.ok) {
			throw new Error(r.statusText)
		}
		return await r.json()
	} catch (e) {
		throw e
	}
	// TODO This is no good.
	throw Error('reached the end of the function!')
}

async function deleteUser(id) {
	try {
		const r = await fetch(`${ENDPOINT_BASE_URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({comment: 'Just testing the DELETE API method.'}),
		})
		if (!r.ok) {
			throw new Error(r.statusText)
		}
		return await r.json()
	} catch (e) {
		throw e
	}
	// TODO This is no good.
	throw Error('reached the end of the function!')
}

const MswTest = () => {
	const [api, setApi] = useState(false)
	const [refresh, setRefresh] = useState(0)
	const [users, setUsers] = useState([])

	const refreshList = () => setRefresh(refresh + 1)

	useEffect(() => {
		if (process.env.NODE_ENV !== 'development') {
			console.log('use actual service')
			return
		}

		if (api) {
			console.log('api is initialized')
			return
		}

		MswBrowser.start({
			// Do not log warnings about missing handlers.
			onUnhandledRequest: 'bypass',
		}).then(() => {
			console.log('Mock Service Worker started.')
			setApi(true)
		})
	}, [])

	useEffect(() => {
		if (!api) {
			return
		}
		fetchUserList()
			.then((data) => setUsers(data))
			.catch((e) => console.log(`failed to fetch user list: ${e}`))
	}, [api, refresh])

	const handleNewUser = () => {
		if (!api) {
			console.log('API not available yet.')
			return
		}
		postUser(getNewUser())
			.then((data) => {
				console.log(`new user created: ${data.message}`)
				refreshList()
			})
			.catch((e) => console.log(`failed to create new user: ${e}`))
	}

	const handleDelete = (id) => {
		if (!api) {
			console.log('API not available yet.')
			return
		}
		deleteUser(id)
			.then((data) => {
				console.log(`user deleted: ${data.message}`)
				refreshList()
			})
			.catch((e) => console.log(`failed to delete user: ${e}`))
	}

	const handleUpdate = (id) => {
		if (!api) {
			console.log('API not available yet.')
			return
		}
		updateUser(id, getNewUser())
			.then((data) => {
				console.log(`user updated: ${data.message}`)
				refreshList()
			})
			.catch((e) => console.log(`failed to update user: ${e}`))
	}

	return (
		<div className="h-full min-h-96 flex flex-col items-center">
			<h2 className="my-4 text-3xl">Mock Service Worker Test</h2>

			<div className="p-4 bg-neutral-200 rounded-md">
				Here we be testing the MSW browser variant.
				<br />
				{api ? (
					<>
						<span>Mock API is ready for use.</span>
						<br />
						<Button disabled={!api} onClick={handleNewUser}>
							Add User
						</Button>
					</>
				) : (
					<Spinner />
				)}
			</div>
			{users.map((u, k) => (
				<UserCard
					handleUpdate={() => handleUpdate(u.id)}
					handleDelete={() => handleDelete(u.id)}
					{...u}
					key={k}
				/>
			))}
		</div>
	)
}

Router.setRoute('/msw-test', <MswTest />)

export default MswTest
