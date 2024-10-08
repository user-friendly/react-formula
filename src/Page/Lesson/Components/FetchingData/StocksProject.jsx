import _ from 'lodash'

import { useState, useEffect } from 'react'

import Spinner from './Components/Spinner'

const ENDPOINT_URL = 'https://api.react-formula.com/learning-api/demos/stocks-project/stocks'

const StockCard = ({name, current_price, previous_price, symbol}) => {
	return <div>
		<span>{name}</span>,
		<span>{current_price}</span>,
		<span>{previous_price}</span>,
		<span>{symbol}</span>
	</div>
}

export default () => {
	const [loading, setLoading] = useState(true)
	const [stocks, setStocks] = useState([])
	
	const fetchStocks = () => {
		fetch(ENDPOINT_URL)
			.then(r => r.json())
			.then(d => {
				console.log('got the stocks')
				console.log(d)
				setStocks(d)
				setLoading(false)
			})
	}
	
	useEffect(() => {
		console.log('set timeout')
		const tid = setTimeout(() => {
			console.log('fetching stocks')
			fetchStocks()
		}, 1500)
		
		return () => {
			console.log('on mount effect cleanup')
			clearTimeout(tid)
		}
	}, [])
	
	return <div className="pt-4 flex flex-col items-center">
		{loading
			? <Spinner bg="bg-white" borderColor="border-blue-400" extra="text-center text-blue-400">^</Spinner>
			: stocks.map((s, i) => <StockCard {...s} key={i} />)
		}
	</div>
}
