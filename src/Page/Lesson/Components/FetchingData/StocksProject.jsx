import _ from 'lodash'

import { useState, useEffect } from 'react'

import Spinner from './Components/Spinner'

const ENDPOINT_URL = 'https://api.react-formula.com/learning-api/demos/stocks-project/stocks'

const StockCard = ({name, current_price, previous_price, symbol}) => {
	// TODO Remove text code.
	// previous_price = _.random(0, 2) === 1 ? current_price : previous_price
	const move = ((current_price - previous_price) / current_price) * 100
	const price = current_price / 100
	
	const up = 'bg-green-200 text-green-600'
	const down = 'bg-red-200 text-red-600'
	const noop = 'bg-neutral-200 text-neutral-600'
	
	return <div className="
		m-4 p-4 border border-neutral-400 bg-white text-neutral-400
		flex justify-between
	">
		<div className="flex flex-col">
			<span>{name}</span>
			<span className="text-2xl text-blue-400 font-bold">{symbol}</span>
		</div>
		
		<div className="flex flex-col items-end">
			<span className={`
				px-2 py-1 rounded-full text-xs
				${move > 0 ? up : null} ${move < 0 ? down : null} ${move == 0 ? noop : null}
			`}>{move !== 0 ? `${move.toFixed(2)}%` : '-'}</span>
			<span className="text-2xl text-black">${price.toFixed(2)}</span>
		</div>
	</div>
}

export default () => {
	const [loading, setLoading] = useState(true)
	const [stocks, setStocks] = useState([])
	
	const fetchStocks = () => {
		fetch(ENDPOINT_URL)
			.then(r => r.json())
			.then(d => {
				setStocks(d)
				setLoading(false)
			})
	}
	
	useEffect(() => {
		console.log('add some artificial delay to showcase the spinner ;)')
		const tid = setTimeout(() => {
			fetchStocks()
		}, 1500)
		
		return () => {
			clearTimeout(tid)
		}
	}, [])
	
	return <div className="flex flex-col items-center min-w-80">
		<div className="w-full max-w-md">
			{loading
				? <Spinner bg="bg-white" borderColor="border-blue-400" extra="m-auto mt-4 text-center text-blue-400">^</Spinner>
				: stocks.map((s, i) => <StockCard {...s} key={i} />)
			}
		</div>
	</div>
}

/* // TODO Remove text code.
const exampleData = [
    {
        "current_price": 16065,
        "name": "Alphabet, Inc.",
        "previous_price": 16476,
        "symbol": "GOOG"
    },
    {
        "current_price": 19945,
        "name": "Tesla, Inc.",
        "previous_price": 19037,
        "symbol": "TSLA"
    },
    {
        "current_price": 4213,
        "name": "General Motors Company",
        "previous_price": 4195,
        "symbol": "GM"
    },
    {
        "current_price": 61031,
        "name": "Nvidia Corp",
        "previous_price": 64178,
        "symbol": "NVDA"
    },
    {
        "current_price": 18236,
        "name": "Walmart, Inc.",
        "previous_price": 17036,
        "symbol": "WMT"
    },
    {
        "current_price": 14886,
        "name": "Target Corp",
        "previous_price": 13052,
        "symbol": "TGT"
    },
    {
        "current_price": 1613,
        "name": "American Airlines Group, Inc.",
        "previous_price": 1464,
        "symbol": "AAL"
    },
    {
        "current_price": 58395,
        "name": "Netflix, Inc.",
        "previous_price": 47021,
        "symbol": "NFLX"
    }
]*/
