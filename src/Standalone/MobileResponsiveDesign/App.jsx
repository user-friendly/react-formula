
import NavBar from './NavBar'
import Hero from './Hero'

const App = () => {
	return <div className="min-h-screen font-roboto text-violet-800">
		<NavBar />
		<Hero />
		{/*
			<p className="font-ubuntu">This is a satandalone App, within the main app.</p>
			<p className="font-roboto">Let's see how it works out. Definitely gonna increase the size of the whole site.</p>
		*/}
		<div>Proudly Disappointing Users, since 2016</div>
	</div>
}

export default App