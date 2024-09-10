/**
 * Main application component.
 */

import { useState } from 'react'

import Button from './Button'
import NavBar from './NavBar'

import NotFound from './Page/NotFound'
import Home from './Page/Home'
import Portfolio from './Page/Portfolio'

console.log('Execute App component\'s main JSX file.')

const map = {
	'404':			<NotFound />,
	'/home':		<Home />,
	'/':			<Home />,
	'/portfolio': 	<Portfolio />
}
const getRoute = route => map[route] !== undefined ? route : '404'

let navigateTo = null

const App = () => {
  // Prepare to render the main component.
  
  const [route, setRoute] = useState(getRoute(window.location.pathname))
  
  navigateTo = (route) => {
	// This state change will exeute a whole app render. No good.
	setRoute(getRoute(route))
	console.log(`Navigate App to ${route}. TODO Use a real router that will handle window location changes and history.`)
  }

  console.log('Render App.')
  return <div className="flex flex-col pt-6">
  	<NavBar>
		<Button route="/">Home</Button>
		<Button route="/portfolio">Portfolio</Button>
		<Button route="/resume">Resume</Button>
		<Button route="/about">About</Button>
		
		{/*
		<Button>Item 1</Button>
		<Button>Item 2</Button>
		<Button>Item 3</Button>
		<Button>Item 4</Button>
		*/}
	</NavBar>
	
	{/* TODO Centering content with margin x-axis auto at medium breakpiont, is this a good idea? */}
	<div className="
		text-sans
		
		w-auto
		
		md:max-w-screen-md
		md:mx-auto
		
		mx-6 my-8
	">
		{map[route]}
	</div>
		
	<div>
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

export { navigateTo as AppNavigateTo }
export default App
