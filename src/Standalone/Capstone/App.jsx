import {Link} from 'react-router-dom'

const App = () => {
	return <div className="min-h-screen flex flex-col justify-center items-center">
		<h1 className="my-4 text-5xl">Capstone Project</h1>
		<div className="my-2 text-lg">
			<p>This is a satandalone App, within the main app.</p>
			<p>Let's see how it works out. Definitely gonna increase the size of the whole site.</p>
			<Link className="text-sky-400 hover:underline" to="/">Back To Main App</Link>
		</div>
	</div>
}

export default App