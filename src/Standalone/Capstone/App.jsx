
import _ from 'lodash'

import {useState} from 'react'
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import {apiLogoutUser, getSessionStorage, setSessionStorage, removeSessionStorage} from '#cap/Services'
import SessionContext from '#cap/Context/Session'

import RoutesMap from '#cap/RoutesMap'
import NavBar from '#cap/NavBar'

const globalFontStyle = "text-green-600"

const App = () => {
	const [session, setSession] = useState(() => getSessionStorage())
	
	const sessionUtility = {
		isActive: () => {
			return _.isObject(session)
		},
		getData: () => {
			return session
		},
		signIn: (sessionData) => {
			setSession(sessionData)
			setSessionStorage(sessionData)
		},
		signOut: async () => {
			let success = false
			if (_.isObject(session)) {
				console.log(`Sign out user {${session.username}}.`)
				success = await apiLogoutUser(session)
			} else {
				console.log('No user was signed in.')
			}
			setSession(null)
			removeSessionStorage()
			return success
		}
	}
	
	return <SessionContext.Provider value={sessionUtility}>
		<BrowserRouter>
			<div className={`${globalFontStyle}`}>
				<RoutesMap />
			</div>
			<NavBar />
		</BrowserRouter>
	</SessionContext.Provider>
}

export default App
