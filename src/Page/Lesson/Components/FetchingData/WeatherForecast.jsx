import _ from 'lodash'

import { useState, useEffect } from 'react'

import Spinner from './Components/Spinner'

const DRAMATIC_DELAY = 1000

const ENDPOINT_POINT_URL = 'https://api.weather.gov/points'

const locations = [
	{id: 'NY1', name: 'Manhattan, NY', point: [40.7814, -73.9693]},
	{id: 'CA1', name: 'San Francisco, CA', point: [37.7922546, -122.393647]}
]

async function fetchForecastEndpoint(point) {
	if (_.isArray(point)) {
		point = point.join(',')
	}
	try {
		const r = await fetch(`${ENDPOINT_POINT_URL}/${point}`)
		if (!r.ok) {
			throw new Error(`HTTP error! Status: ${r.status}`)
		}
		const d = await r.json()
		if (!_.has(d, 'properties.forecast')) {
			throw new Error('response error, forecast endpoint not found')
		}
		return d.properties.forecast
	} catch (e) {
		console.error(`failed to get forecast endpoint: ${e}`)
		return false
	}
}

async function fetchForecast(endpoint) {
	let data = null
	try {
		const r = await fetch(endpoint)
		if (!r.ok) {
			throw new Error(`HTTP error! Status: ${r.status}`)
		}
		data = await r.json()
		if (!_.has(data, 'properties.periods') || !_.isArray(data.properties.periods)) {
			throw new Error('response error, periods not found')
		}
	} catch (e) {
		console.error(`failed to get daily forcast: ${e}`)
		return false
	}
	
	let newDays = data.properties.periods
	if (!newDays[0].isDaytime) {
		newDays = [_.clone(newDays[0]), ...newDays.slice(0, -1)]
		newDays[0].isDaytime = true
	}
	let sk = 1000
	return _.reduce(newDays, (a, d, k) => {
		if (d.isDaytime) {
			a.push({
				key: sk++,
				name: d.name,
				icon: d.icon,
				tempDay: d.temperature,
				tempNight: null,
				tempUnit: d.temperatureUnit,
				rainProb: d.probabilityOfPrecipitation.value
			})
		}
		else {
			a[a.length-1].tempNight = d.temperature
		}
		return a
	}, [])
}

const ForecastDayCard = ({name, icon, tempDay, tempNight, tempUnit, rainProb}) => {
	return <div className="
		m-2 p-4 w-44 rounded-lg border border-neutral-300 bg-white
		flex flex-col items-center
	">
		<span className="break-all hyphens-auto text-center text-xl text-neutral-600">{name}</span>
		<img className="my-3 w-20 rounded-full" src={icon} />
		<div className="w-24 flex justify-between">
			<span className="">{tempDay}°{tempUnit}</span>
			<span className="text-neutral-400">{tempNight}°{tempUnit}</span>
		</div>
	</div>
}

export default () => {
	const [refresh, setRefresh] = useState(true)
	const [location, setLocation] = useState('CA1')
	const [days, setDays] = useState([])
	const [error, setError] = useState(null)
	
	const fetchData = async (point) => {
		const forecastUrl = await fetchForecastEndpoint(point)
		if (!forecastUrl) {
			setError(true)
			return
		}
		const days = await fetchForecast(forecastUrl)
		if (!days) {
			setError(true)
			return
		}
		// console.log('update forecast')
		setDays(days)
		setRefresh(false)
		setError(false)
	}
	
	const refreshData = () => {
		const loc = locations.find(v => v.id === location)
		// console.log(`fetch forecast for: ${loc.name}, ${loc.point.join(',')}`)
		fetchData(loc.point)
	}
	
	useEffect(() => {
		if (!refresh) {
			// console.log('no refresh needed')
			return
		}
		const tid = setTimeout(refreshData,	DRAMATIC_DELAY)
		return () => {
			// console.log('clear timeout')
			clearTimeout(tid)
		}
	}, [location, refresh])
	
	const selectHandler = (e) => {
		// console.log(`Set location to ${e.target.value}`)
		setLocation(e.target.value)
		setRefresh(true)
	}
	
	const buttonHandler = (e) => {
		// console.log(`Refresh requested`)
		setRefresh(true)
	}
	
	let content = null
	if (error) {
		content =  <>Could not get forecast. Please, try again later.</>
	} else if (refresh) {
		content = <Spinner bg="bg-white" borderColor="border-blue-400" extra="m-auto mt-4 text-center text-blue-400">^</Spinner>
	} else {
		content = days.map((d, i) => <ForecastDayCard {...d} key={d.key} />)
	}
	
	return <div className="flex flex-col items-center min-w-80">
		<div className="py-8 text-xl">
			<select className="mr-2 p-1 border border-neutral-300 rounded-md outline-neutral-600"
				value={location} onChange={selectHandler}>
				{locations.map((l, i) => <option value={l.id} key={i}>{l.name}</option>)}
			</select>
			<button onClick={buttonHandler}>🔃</button>
		</div>
		<div className="w-full max-w-3xl flex flex-wrap justify-center">
			{content}
		</div>
		<div className="my-4 text-sm text-neutral-400">
			Forecast provided by <a href="https://www.weather.gov/" target="_blank">
				<img className="inline rounded-full w-12" src="/nws-logo.png" />
			</a>
		</div>
	</div>
}
