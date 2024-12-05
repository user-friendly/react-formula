
import _ from 'lodash'

import {useState} from 'react'
import {RouterProvider, createBrowserRouter, Link, Routes, Route} from 'react-router'

import {apiLogoutUser, getSessionStorage, setSessionStorage, removeSessionStorage} from '#cap/Services'
import SessionContext from '#cap/Context/Session'

import {useDocumentTitle} from '#cap/DocumentTitle'

import RoutesMap from '#cap/RoutesMap'

// import './Style/index.css'

const globalStyles = `bg-emerald-50 font-lato text-emerald-600`

const router = createBrowserRouter([
	{
		path: "*",
		element: <RoutesMap />,
	},
])

const App = () => {
	const [session, setSession] = useState(() => getSessionStorage())
	const [title, setTitle] = useDocumentTitle()
	
	console.log('Render Capstone App')
	
	const sessionUtility = {
		data: session,
		isActive: () => {
			return _.isObject(session)
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
		<div className={`${globalStyles} min-h-screen`}>
			<RouterProvider router={router} />
		</div>
	</SessionContext.Provider>
}

export default App
