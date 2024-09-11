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
  
  const bpStyles = false ? 'md:max-w-screen-md md:mx-auto' : '';
  
  return <div className="flex flex-col justify-between pt-6 h-dvh">
  	<NavBar>
		<Button route="/">Home</Button>
		<Button route="/lesson">Lesson</Button>
		<Button route="/about">About</Button>
	</NavBar>
	
	<div className={`
		text-sans
		w-auto
		${bpStyles}
		mx-6 my-4
	`}>
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
