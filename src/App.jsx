/**
 * Main application component.
 */

import _ from 'lodash'

import {useState, Suspense} from 'react'

import Router from '#Router'
import RouterPathMap from 'RouterPathMap'

import Spinner from '#Components/Spinner'
import Button from '#Button'
import SelectItem from '#SelectItem'
import NavBar from '#NavBar'
import NotFound from '#Page/NotFound'

Router.setRedirect('/home', '/lesson/crud')
Router.setRedirect('/', '/home')

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

	return (
		<div className="h-dvh flex flex-col justify-between">
			{/* Header */}
			<div className="bg-indigo-100">
				<NavBar>
					<Button route="/home" onClick={onRouteSelected}>
						Home
					</Button>
					<SelectItem
						name="routes"
						items={lessonRoutes}
						value={currentRoute.path}
						onSelect={onLessonSelected}
					/>
					<Button route="/about" onClick={onRouteSelected}>
						About
					</Button>
				</NavBar>
				<NavBar>
					<Button route="/weather" onClick={onRouteSelected}>
						Weather
					</Button>
					<Button route="/msw-test" onClick={onRouteSelected}>
						Mock Service Worker
					</Button>
					<Button route="/promises" onClick={onRouteSelected}>
						JS Promise
					</Button>
					<Button route="/random" onClick={onRouteSelected}>
						PseudoRNG
					</Button>
					<Button route="/graphics" onClick={onRouteSelected}>
						Graphics
					</Button>
				</NavBar>
			</div>

			{/* Content */}
			<div className={`bg-sky-50 text-sans ${bpStyles} px-6 py-4 flex-1`}>
				<Suspense fallback={
					<div className="w-full h-full flex justify-center items-center">
						<Spinner dim="w-40 h-40" borderWidth="border-[2.5rem]" borderColor="border-gray-700" />
					</div>
				}>
					{currentRoute.component}
				</Suspense>
			</div>

			{/* Footer */}
			<div className="bg-indigo-100">
				<NavBar>
					<Button todo="/sitemap">Site Map</Button>
					<Button todo="/contact">Contact</Button>
				</NavBar>

				<NavBar>
					<Button todo="/terms">Terms & Conditions</Button>
					<Button todo="/privacy">Privacy Policy</Button>
				</NavBar>
			</div>
		</div>
	)
}

export default App
