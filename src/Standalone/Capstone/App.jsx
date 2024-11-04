
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import RoutesMap from '#cap/RoutesMap'

const globalFontStyle = "text-green-600"

const App = () => {
	return <BrowserRouter>
		<div className={`${globalFontStyle}`}>
			<RoutesMap />
		</div>
	</BrowserRouter>
}

export default App
