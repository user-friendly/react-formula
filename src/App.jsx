/**
 * Main application component.
 */

import _ from 'lodash'

import Router from './Router'
import RouterPreloader from './RouterPreloader'
import Button from './Button'
import SelectItem from './SelectItem'
import NavBar from './NavBar'
import { default as PageView, UpdateView } from './PageView'
import NotFound from './Page/NotFound'

// FIXME It may look clever, but it most definitely is not.
Router.addRoute(undefined, <NotFound />)

const onRouteSelected = (event, route) => {
	if (_.isString(route) && !_.isEmpty(route) && route !== '<none>') {
		console.log(`Route selected: ${route}`)
		UpdateView(Router.getRoute(route).component)
	}
}

const App = () => {
  const bpStyles = false ? 'md:max-w-screen-md md:mx-auto' : '';

  const currentRoute = Router.getCurrent()
  let selectedRoute = '<none>'
  // Create a list of the lesson view routes.
  const routes = _.filter(_.toPairs(Router.getRoutes()).map((v, k) => {
	const r = v[1]
	
	// Skip non-lesssons.
	if (!_.startsWith(r.path, '/lesson/'))
		return null
	
	if (r.path === currentRoute.path) {
		selectedRoute = currentRoute.path
	}
	
	// TODO Sort by what?
	const weight = k + 1000;
	return {key: weight, value: r.path, label: r.title}
  }))
  routes.push({key: 0, value: '<none>', label: '-- Select Lesson --'})
  
  return <div className="flex flex-col justify-between h-dvh">
  	{/* Header */}
  	<div className="bg-indigo-100">
	  	<NavBar>
			<Button	route="/" onClick={onRouteSelected}>Home</Button>
			<SelectItem name="routes" items={routes} value={selectedRoute} onSelect={onRouteSelected} />
			<Button route="/lesson" onClick={onRouteSelected}>Current</Button>
			<Button route="/about" onClick={onRouteSelected}>About</Button>
		</NavBar>
	</div>

	{/* Content */}
	<div className={`
		bg-sky-50
		text-sans
		${bpStyles}
		px-6 py-4
		grow
	`}>
		<PageView view={currentRoute.component} />
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
