
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import RoutesMap from '#cap/RoutesMap'
import NavBar from '#cap/NavBar'

const globalFontStyle = "text-green-600"

const App = () => {
	return <BrowserRouter>
		<div className={`${globalFontStyle}`}>
			<RoutesMap />
		</div>
		<NavBar />
	</BrowserRouter>
}

export default App
