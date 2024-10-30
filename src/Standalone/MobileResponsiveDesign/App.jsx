

import {BrowserRouter} from 'react-router-dom'

import NavBar from './NavBar'
import Hero from './Hero'
import FeatureSection from './FeatureSection'

const App = () => {
	return <BrowserRouter> 
		<div className="min-h-screen font-roboto text-violet-800">
			<NavBar />
			<Hero />
			{/*
				<p className="font-ubuntu">This is a satandalone App, within the main app.</p>
				<p className="font-roboto">Let's see how it works out. Definitely gonna increase the size of the whole site.</p>
			*/}
			<FeatureSection />
		</div>
	</BrowserRouter>
}

export default App
