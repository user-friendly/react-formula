
import {useState} from 'react'
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import {getSessionStorage} from '#cap/Services'
import SessionContext from '#cap/Context/Session'

import RoutesMap from '#cap/RoutesMap'
import NavBar from '#cap/NavBar'

const globalFontStyle = "text-green-600"

const App = () => {
	const [session, setSession] = useState(() => getSessionStorage())
	
	return <SessionContext.Provider value={session}>
		<BrowserRouter>
			<div className={`${globalFontStyle}`}>
				<RoutesMap />
			</div>
			<NavBar />
		</BrowserRouter>
	</SessionContext.Provider>
}

export default App
