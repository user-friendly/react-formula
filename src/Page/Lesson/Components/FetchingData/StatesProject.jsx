import _ from 'lodash'

import { useState, useEffect, useRef } from 'react'

import Spinner from '#Components/Spinner'
import Form from '#Components/Form'
import TextInput from '#Components/TextInput'

const FETCH_ERROR_UNKNOWN = -1

const ENDPOINT_URL = 'https://api.react-formula.com/learning-api/demos/states-project/states'

const StateCard = ({capital, description, image, name, nickname, population}) => {
	return <div className="max-w-xl m-4">
		<div className="mb-4 flex">
			<img className="rounded-lg" src={image} />
			
			<div className="ml-4 text-lg flex flex-col justify-evenly">
				<div className="mb-4 text-3xl">{name}</div>
				
				<div><span className="inline-block w-32 font-bold"
					>Nickname</span> {nickname}</div>
				
				<div><span className="inline-block w-32 font-bold"
					>Capital</span> {capital}</div>
				
				<div><span className="inline-block w-32 font-bold"
					>Population</span> {population.toLocaleString()}</div>
			</div>
		</div>
		
		<div className="leading-relaxed">
			{description}
		</div>
	</div>
}

const ErrorMessage = ({error}) => {
	if (error === FETCH_ERROR_UNKNOWN || !_.isString(error)) {
		error = 'something went wrong.'
	}
	return <div className="m-2 px-4 py-2 bg-rose-200 text-xl rounded-lg shadow-lg">
		⚠ <span className="font-bold text-lg text-neutral-500">{_.capitalize(error)}</span>
	</div>
}

async function fetchState(search) {
	const endpoint = `${ENDPOINT_URL}/${search}`
	try {
		return await (await fetch(endpoint)).json()
	} catch (e) {
		console.error(`failed to get state data: ${e}`)
		return {error: FETCH_ERROR_UNKNOWN}
	}
}

export default () => {
	const [search, setSearch] = useState('')
	const [error, setError] = useState(null)
	const [state, setState] = useState(null)
	const inputSearchRef = useRef(null)
	
	async function fetchProxy() {
		// Validate search string.
		if (!(_.isString(search) && search.trim().length)) {
			return
		}
		
		let resp = await fetchState(search)
		if (resp.error === undefined) {
			setState(resp)
			setSearch('')
			setError(null)
		} else {
			setError(resp.error)
		}
	}
	
	function handleSubmit(e) {
		if (search) {
			fetchProxy()
		}
	}
	
	function handleClear(e) {
		setSearch('')
		inputSearchRef.current.focus()
	}
	
	useEffect(() => {
		// TODO Seem a bit aggressive?
		inputSearchRef.current.focus()
	})
	
	return <div className="my-4 flex flex-col items-center">
		<Form className="mb-4 text-lg flex justify-center" onSubmit={handleSubmit}>
			<div className="relative">
				<input name="search" placeholder="enter a U.S. state"
					className="mr-4 p-2 pr-8 rounded-lg border border-neutral-400"
					ref={inputSearchRef} onChange={e => setSearch(e.target.value)} value={search}
				/>
				<button type="button" className="absolute top-2 right-6 opacity-20 hover:opacity-100 focus:opacity-100"
					onClick={handleClear}>❌</button>
			</div>
			<input className="px-4 rounded-lg bg-teal-400 text-teal-800 cursor-pointer" type="submit" value="Search" />
		</Form>
		{state && <StateCard {...state} />}
		{error && <ErrorMessage error={error} />}
	</div>
}
