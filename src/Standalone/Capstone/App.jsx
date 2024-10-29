import {Link} from 'react-router-dom'

const globalFontStyle = "text-green-600"

// Make sure the class set in index.css is mentioned here.
const globalIconStyle = `
	p-2 material-symbols-outlined rounded-lg bg-green-100 select-none cursor-pointer
	hover:bg-green-200 text-green-700
`

const App = () => {
	return <div className={`
		min-h-screen flex flex-col items-center
		${globalFontStyle}
	`}>
		<Link className="text-sky-400 hover:underline" to="/home">Back To Main App</Link>
		<h1 className="my-4 text-5xl">Capstone Project</h1>
		<div className="my-4 text-xl font-playfair">
			Font Playfair Display test. This here is some random text to test the given font.
		</div>
		<div className="my-4 text-xl font-lato">
			Font Lato test. This here is some random text to test the given font. 
		</div>
		<div>
			<h2 className="my-4 text-4xl">Icons</h2>
			<div className="flex items-center gap-4">
				<span className={`${globalIconStyle}`}>menu</span>
				<span className={`${globalIconStyle} text-4xl`}>home</span>
				<span className={`${globalIconStyle}`}>close</span>
			</div>
		</div>
	</div>
}

export default App
