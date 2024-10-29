import {Link} from 'react-router-dom'

const App = () => {
	return <div className="min-h-screen flex flex-col items-center">
		<Link className="text-sky-400 hover:underline" to="/home">Back To Main App</Link>
		<h1 className="my-4 text-5xl">Capstone Project</h1>
		<div className="my-4 text-xl font-playfair">
			Font Playfair Display test. This here is some random text to test the given font.
		</div>
		<div className="my-4 text-xl font-lato">
			Font Lato test. This here is some random text to test the given font. 
		</div>
	</div>
}

export default App
