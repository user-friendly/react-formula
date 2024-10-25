import {Link} from 'react-router-dom'

const App = () => {
	return <div className="min-h-screen flex flex-col justify-center items-center">
		<h1 className="my-4 text-5xl">Mobile Responsive Design</h1>
		<div className="my-2 text-lg">
			<p className="font-ubuntu">This is a satandalone App, within the main app.</p>
			<p className="font-roboto">Let's see how it works out. Definitely gonna increase the size of the whole site.</p>
			<Link className="text-sky-400 hover:underline" to="/">Back To Main App</Link>
		</div>
	</div>
}

export default App
