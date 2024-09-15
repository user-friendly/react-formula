/**
 * Main application component.
 */

import _ from 'lodash'

import { useState } from 'react'

import Router from './Router'
import RouterPreloader from 'RouterPreloader'
import Button from './Button'
import SelectItem from './SelectItem'
import NavBar from './NavBar'
import NotFound from './Page/NotFound'

const App = () => {
  // TODO Remove debug stmt.
  console.log('Redner App component.')
  
  const [ currentRoute, setRoute ] = useState(Router.getInitialRoute())
  
  const lessonSelectValue = '<none>'
  // Create a list of the lesson view routes.
  const lessonRoutes = _.filter(_.toPairs(Router.getRoutes()).map((v, k) => {
	const r = v[1]
	
	// Skip non-lesssons.
	if (!_.startsWith(r.path, '/lesson/'))
		return null
	
	// TODO Sort by what?
	const weight = k + 1000;
	return {key: weight, value: r.path, label: r.title}
  }))
  lessonRoutes.push({key: 0, value: lessonSelectValue, label: '-- Select Lesson --'})
  
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
  
  const bpStyles = false ? 'md:max-w-screen-md md:mx-auto' : '';
  
  return <div className="h-dvh flex flex-col justify-between">
  	{/* Header */}
  	<div className="bg-indigo-100">
	  	<NavBar>
			<Button	route="/" onClick={onRouteSelected}>Home</Button>
			<SelectItem name="routes" items={lessonRoutes} value={currentRoute.path} onSelect={onLessonSelected} />
			<Button route="/lesson/" onClick={onRouteSelected}>Current</Button>
			<Button route="/lesson/search-page-design" onClick={onRouteSelected}>Search</Button>
			<Button route="/about" onClick={onRouteSelected}>About</Button>
		</NavBar>
	</div>

	{/* Content */}
	<div className={`
		bg-sky-50
		text-sans
		${bpStyles}
		px-6 py-4
		flex-1
	`}>
		{currentRoute.component}
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
}

export default App
