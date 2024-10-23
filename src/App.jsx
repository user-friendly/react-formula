/**
 * Main application component.
 */

import _ from 'lodash'

import {lazy, useState, Suspense} from 'react'

import Router from '#Router'
import RouterPathMap from 'RouterPathMap'

import {
	BrowserRouter, Routes, Route, Link,
	useLocation, useParams,
	redirect
} from 'react-router-dom'

import Spinner from '#Components/Spinner'
import Button from '#Button'
import SelectItem from '#SelectItem'
import NavBar from '#NavBar'
import NotFound from '#Page/NotFound'

import Sitemap from '#Page/Sitemap'
import Contact from '#Page/Contact'

const linkStyle="select-none cursor-pointer px-2.5 py-0.5 rounded-xl bg-sky-400 transition-bg"

const App = () => {
	const [currentRoute, setRoute] = useState(Router.getInitialRoute())
	
	const lessonSelectValue = '<none>'
	// Create a list of the lesson view routes.
	const lessonRoutes = _.filter(
		_.toPairs(Router.getRoutes()).map((v, k) => {
			const r = v[1]

			// Skip non-lesssons.
			if (!_.startsWith(r.path, '/lesson/')) return null

			// TODO Sort by what?
			const weight = k + 1000
			return {key: weight, value: r.path, label: r.title}
		})
	)
	lessonRoutes.push({
		key: 0,
		value: lessonSelectValue,
		label: '-- Select Lesson --',
	})

	// Respond to route changes.
	const onRouteSelected = (event, path) => {
		console.log(`New path selected: ${path}`)
		if (_.isString(path) && !_.isEmpty(path)) {
			setRoute(Router.getRoute(path))
		}
	}

	const onLessonSelected = (event, path) => {
		console.log(`New lesson selected: ${path}`)
		if (path !== lessonSelectValue) {
			onRouteSelected(event, path)
		}
	}

	const bpStyles = false ? 'md:max-w-screen-md md:mx-auto' : ''

	const RouteInfo = () => {
		const loc = useLocation()
		const par = useParams()
		return <div>
			<div>Location: {JSON.stringify(loc, null, 2)}</div>
			<div>Params: {JSON.stringify(par, null, 2)}</div>
		</div>
	}
	
	// Aka, home page.
	const Index = lazy(() => import('#Page/Lesson/CRUD'))
	
	return (<BrowserRouter>
		<div className="h-dvh flex flex-col justify-between">
			{/* Header */}
			<div className="bg-indigo-100">
				<NavBar>
					<Link className={linkStyle} to="/home">
						Home
					</Link>
					<SelectItem
						name="routes"
						items={lessonRoutes}
						value={currentRoute.path}
						onSelect={onLessonSelected}
					/>
					<Link className={linkStyle} to="/about">
						About
					</Link>
				</NavBar>
				<NavBar>
					<Link className={linkStyle} to="/weather">
						Weather
					</Link>
					<Link className={linkStyle} to="/msw-test">
						Mock Service Worker
					</Link>
					<Link className={linkStyle} to="/promises">
						JS Promise
					</Link>
					<Link className={linkStyle} to="/random">
						PseudoRNG
					</Link>
					<Link className={linkStyle} to="/graphics">
						Graphics
					</Link>
				</NavBar>
			</div>

			{/* Content */}
			<div className={`bg-sky-50 text-sans ${bpStyles} px-6 py-4 flex-1`}>
				<Suspense fallback={
					<div className="w-full h-full flex justify-center items-center">
						<Spinner dim="w-40 h-40" borderWidth="border-[2.5rem]" borderColor="border-gray-700" />
					</div>
				}>
					<RouterPathMap index={<Index />} notfound={<NotFound />} />
				</Suspense>
			</div>

			{/* Footer */}
			<div className="bg-indigo-100">
				<NavBar>
					<Link className={linkStyle} to="/sitemap">Sitemap</Link>
					<Link className={linkStyle} to="/contact">Contact</Link>
				</NavBar>

				<NavBar>
					<Button todo="/terms">Terms & Conditions</Button>
					<Button todo="/privacy">Privacy Policy</Button>
				</NavBar>
			</div>
		</div>
	</BrowserRouter>)
}

export default App
