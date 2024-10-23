/**
 * Random page component.
 * 
* %title = Pseudorandom Number Generator
* %route = /random
 */

import _ from 'lodash'

import {useState, useEffect} from 'react'

import MersenneTwister from 'mersennetwister'

import Form from '#Components/Form'

export const PAGE_TITLE = 'Pseudorandom Number Generator'

let mt = new MersenneTwister(1)

const Button = (props) => {
	return (
		<button
			className="my-2 mx-1 px-2 py-1 bg-blue-500 text-xl text-white rounded-md hover:bg-blue-600 active:bg-blue-700
					   disabled:bg-neutral-400"
			{...props}
		>
			{props.children}
		</button>
	)
}

const tableHeaderCellStyle = "p-2 border border-gray-300 bg-violet-100"
const tableCellStyle = "p-2 border border-gray-300 bg-white"

const NumbersTable = ({list}) => {
	const sequence = []
	
	list.forEach((nums, s) => 
		nums.forEach((n, k) =>
			sequence.push(<Sequence key={`${s}.${k}-${n}`} seed={s} serial={k} number={n} />)))
	
	return <table className="border-2 border-gray-500">
		<thead>
			<tr>
				<th className={tableHeaderCellStyle}>Seed</th>
				<th className={tableHeaderCellStyle}>Iteration</th>
				<th className={tableHeaderCellStyle}>Random Number</th>
			</tr>
		</thead>
		<tbody>
			{sequence}
		</tbody>
	</table>
}

const Sequence = ({seed, serial, number}) => {
	return <tr>
		<td className={tableCellStyle}>{seed}</td>
		<td className={tableCellStyle}>{serial}</td>
		<td className={tableCellStyle}>{number}</td>
	</tr>
}

/**
 * Yup, it got a complicated.
 *
 * Instead of a smiple map of arrays, might be a good idea to have
 * a class/object that holds the seed, the PRNG object (MersenneTwister,
 * in the current case) and the sequentioal list of numbers.
 * Code would be simplified and broken down, no need to reset and iterate
 * over again the one instance of the PRNG object.
 */

const Random = () => {
	const [saved, setSaved] = useState(null)
	const [seed, setSeed] = useState(1)
	const [list, setList] = useState(new Map())
	const [seedInput, setSeedInput] = useState(seed)

	const saveRngEngine = () => {
		const state = {
			seed: seed,
			list: JSON.stringify(Array.from(list.entries())),
			mt: mt.mt,
			mti: mt.mti,
		}
		const str = JSON.stringify(state)
		setSaved(str)
	}

	const loadRngEngine = () => {
		if (!saved) {
			return
		}
		const state = JSON.parse(saved)
		// The inital seed should not matter, if the internal
		// state is overwritten.
		mt = new MersenneTwister(128)
		mt.mt = state.mt
		mt.mti = state.mti
		// Update app states.
		setSeed(state.seed)
		setSeedInput(state.seed)
		setList(new Map(JSON.parse(state.list)))
	}

	const getList = (seed) => {
		if (!list.has(seed)) {
			list.set(seed, [])
		}
		return list.get(seed)
	}

	const clearList = () => {
		mt.seed(seed)
		setList(new Map())
	}

	const generateNumber = () => {
		console.log(`Generate number using seed ${seed}.`)
		const l = getList(seed)
		l.push(mt.int())
		setList(new Map(list))
	}

	const updateSeed = () => {
		if (seed === seedInput) {
			return
		}
		console.log(`Seed will be updated to ${seedInput}.`)
		mt.seed(seedInput)
		const l = getList(seedInput)
		// Setting the seed resets the PRNG to its first number.
		// Advance the pointer to the latest one generated.
		l.forEach(() => mt.int())
		setSeed(seedInput)
	}

	// Has to be executed on each state change, only for
	// states that are used in the body of the handleKeyPress event
	// handler. Because all PRNG mutators can be called, depending
	// on a given key press, all states must be dependant.
	useEffect(() => {
		const handleKeyPress = (event) => {
			const isModified =
				event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

			if (!isModified) {
				if (event.code === 'KeyC') {
					clearList()
				} else if (event.code === 'KeyG') {
					generateNumber()
				} else if (event.code === 'ArrowUp') {
					if (seedInput < Number.MAX_SAFE_INTEGER) {
						setSeedInput(seedInput + 1)
					}
				} else if (event.code === 'ArrowDown') {
					if (seedInput > 1) {
						setSeedInput(seedInput - 1)
					}
				} else if (event.code === 'Enter') {
					updateSeed()
				}
			}
		}
		document.body.addEventListener('keyup', handleKeyPress)
		return () => {
			document.body.removeEventListener('keyup', handleKeyPress)
		}
	}, [seed, list, seedInput, saved])

	return (<>
		<h2 className="m-4 text-4xl text-center">{PAGE_TITLE}</h2>
		<div className="m-auto mt-6 max-w-2xl py-6 px-4 rounded-xl bg-neutral-100 flex flex-col items-center">

			<div className="m-2">
				<Button onClick={() => saveRngEngine()}>Save</Button>
				<Button disabled={!saved} onClick={() => loadRngEngine()}>Load</Button>
			</div>

			<div className="m-2">
				Use up/down arrow keys to increase or decrease seed.
				<br />
				Enter - updates the current seed.
				<br />
				C - clears the list of seeds.
				<br />G - generate number, using the current seed.
			</div>

			<div className="m-2 text-xl flex flex-col items-center">
				<span>Current seed:</span>
				<span className="font-bold">{seed}</span>
			</div>

			<Form
				onKeyUp={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				className="flex flex-col"
				onSubmit={generateNumber}
			>
				<Button onClick={clearList} type="button">
					Clear List
				</Button>
				<div>
					<input
						className="my-2 mx-1 px-2 py-1 w-48 bg-blue-100 text-xl rounded-md"
						type="number"
						min={1}
						max={Number.MAX_SAFE_INTEGER}
						name="batchSize"
						value={seedInput}
						onChange={(e) => setSeedInput(parseInt(e.target.value))}
					/>
					<Button onClick={updateSeed} type="button">
						Set Seed
					</Button>
				</div>
				<Button type="submit">Generate</Button>
			</Form>

			<div className="flex flex-col">
				<NumbersTable list={list} />
			</div>
		</div>
	</>)
}

export default Random
