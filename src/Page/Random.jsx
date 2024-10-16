/**
 * Random page view.
 */

import {useState, useEffect} from 'react'

import MersenneTwister from 'mersennetwister'

import Router from '#Router'
import Form from '#Components/Form'

const Button = (props) => {
	return <button className="my-2 mx-1 px-2 py-1 bg-blue-500 text-xl text-white rounded-md hover:bg-blue-600 active:bg-blue-700" {...props}>{props.children}</button>
}

const mt = new MersenneTwister(1)

const Random = () => {
	const [seed, setSeed] = useState(1)
	const [list, setList] = useState(new Map())
	
	console.log(list)
	
	const getList = (seed) => {
		if (!list.has(seed)) {
			list.set(seed, [])
		}
		return list.get(seed)
	}
	
	const resetList = () => {
		console.log('Reset list.')
		mt.seed(seed)
		setList(new Map())
	}
	
	const handleGenerate = () => {
		console.log(`Generate number using seed ${seed}.`)
		const l = getList(seed)
		l.push(mt.int())
		setList(new Map(list))
	}
	
	const handleSeed = () => {
		mt.seed(seed)
		const l = getList(seed)
		// TODO Could be just a for loop.
		l.forEach(() => mt.int())
		console.log(`Seed updated to ${seed}.`)
	}
	
	const listNums = []
	list.forEach((nums, s) => {nums.forEach((n, k) => {listNums.push(<span key={listNums.length}>Seed {s}, i {k}: {n}</span>)})})
	
	const handleKeyUp = (event) => {
		// FIXME Doesn't work, needs to re-capture scoped vars on each render.
    }
	
	useEffect(() => {
		// FIXME Doesn't work, needs to re-capture scoped vars on each render.
		window.addEventListener("keyup", handleKeyUp)
		//window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keyup", handleKeyUp)
			//window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])
	
	return (
		<div className="
			m-auto mt-6 max-w-2xl py-2 px-4 rounded-xl bg-neutral-200
			flex flex-col items-center
		">
			<h2 className="text-4xl">Random Numbers</h2>
			
		
			<Form className="flex flex-col" onSubmit={handleGenerate}>
				<Button onClick={resetList} type="button">Clear</Button>
				<div>
					<input className="my-2 mx-1 px-2 py-1 w-48 bg-blue-100 text-xl rounded-md"
						type="number" min={1} max={Number.MAX_SAFE_INTEGER} 
						name="batchSize" value={seed} onChange={e => setSeed(parseInt(e.target.value))}
					/>
					<Button onClick={handleSeed} type="button">Set Seed</Button>
				</div>
				<Button type="submit">Generate</Button>
			</Form>

			<div className="flex flex-col">
				{listNums}
			</div>
		</div>
	)
}

Router.setRoute('/random', <Random />)

export default Random
