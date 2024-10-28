import {Link} from 'react-router-dom'

const App = () => {
	return <div className="min-h-screen flex flex-col items-center">
		<Link className="text-sky-400 hover:underline" to="/">Back To Main App</Link>
		<h1 className="my-4 text-5xl">Capstone Project</h1>
	</div>
}

export default App
