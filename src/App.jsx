/**
 * Main application component.
 */

import PageView from './PageView'
import Button from './Button'
import NavBar from './NavBar'

// console.log('Execute App component\'s main JSX file.')

const App = () => {
  // Render the main component.
  // console.log('Render App.')
  
  return <div className="flex flex-col pt-6">
  	<NavBar>
		<Button route="/">Home</Button>
		<Button route="/portfolio">Portfolio</Button>
		<Button route="/resume">Resume</Button>
		<Button route="/about">About</Button>
	</NavBar>
	
	{/* TODO Centering content with margin x-axis auto at medium breakpiont, is this a good idea? */}
	<div className="
		text-sans
		
		w-auto
		
		md:max-w-screen-md
		md:mx-auto
		
		mx-6 my-8
	">
		<PageView />
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

export default App
