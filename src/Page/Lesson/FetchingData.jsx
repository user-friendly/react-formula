/**
 * Module 7: Fetching Data
 *
 * Path: /lesson/fetching-data
 */

import Router from '#Router'

import Collapsable from './Components/Collapsable'

import UsingFetch from './Components/FetchingData/UsingFetch'
import RandomJoke from './Components/FetchingData/RandomJoke'
import TeammatesProject from './Components/FetchingData/TeammatesProject'
import StocksProject from './Components/FetchingData/StocksProject'
import WeatherForecast from './Components/FetchingData/WeatherForecast'
import StatesProject from './Components/FetchingData/StatesProject'
//import ModuleLesson from './Components/FetchingData/ModuleLesson'
//import ModuleLesson from './Components/FetchingData/ModuleLesson'
//import ModuleLesson from './Components/FetchingData/ModuleLesson'

const FetchingData = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={true} title="Using Fetch">
			<UsingFetch />
		</Collapsable>,
		<Collapsable key={i++} collapse={true} title="RandomJoke">
			<RandomJoke />
		</Collapsable>,
		<Collapsable key={i++} collapse={true} title="Teammates Project">
			<TeammatesProject />
		</Collapsable>,
		<Collapsable key={i++} collapse={true} title="Stocks Project">
			<StocksProject />
		</Collapsable>,
		<Collapsable key={i++} collapse={true} title="Weather Forecast">
			<WeatherForecast />
		</Collapsable>,
		<Collapsable key={i++} collapse={false} title="States Project">
			<StatesProject />
		</Collapsable>,
		/*		<Collapsable key={i++} collapse={true} title='Using Fetch'>
			<UsingFetch /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='Using Fetch'>
			<UsingFetch /></Collapsable>,*/
	]

	return (
		<div className="h-full flex flex-col justify-start items-strech">
			<h1 className="my-4 text-5xl self-center">Fetching Data</h1>

			{lessons}
		</div>
	)
}

Router.setRoute(
	'/lesson/fetching-data',
	<FetchingData />,
	'Module 7: Fetching Data'
)

export default FetchingData
