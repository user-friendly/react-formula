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
  
  return <div className="flex flex-col justify-between h-dvh">
  	{/* Header */}
  	<div className="bg-indigo-100">
	  	<NavBar>
			<Button route="/">Home</Button>
			<Button route="/lesson">Lesson</Button>
			<Button route="/about">About</Button>
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
		<PageView />
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
