
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import RoutesMap from '#cap/RoutesMap'
import NavBar from '#cap/NavBar'

const globalFontStyle = "text-green-600"

const App = () => {
	return <BrowserRouter>
		<NavBar />
		<div className={`${globalFontStyle}`}>
			<RoutesMap />
		</div>
	</BrowserRouter>
}

export default App
