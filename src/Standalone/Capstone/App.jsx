
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import RoutesMap from '#cap/RoutesMap'
import NavBar from '#cap/NavBar'

const globalFontStyle = "text-green-600"

// Make sure the class set in index.css is mentioned here.
const globalIconStyle = `
	p-2 material-symbols-outlined rounded-lg bg-green-100 select-none cursor-pointer
	hover:bg-green-200 text-green-700
`

const App = () => {
	return <BrowserRouter>
		<div className={`
			min-h-screen flex flex-col items-center
			${globalFontStyle}
		`}>
			{/* Header */}
			<div>
				<h1 className="my-6 text-5xl">Capstone Project</h1>
				<NavBar />
			</div>
			
			{/* Page Wrapper */}
			<div>
				<RoutesMap />
			</div>
			
			{/* Footer */}
			<div>[Footer goes here]</div>
		</div>
	</BrowserRouter>
}

export default App
