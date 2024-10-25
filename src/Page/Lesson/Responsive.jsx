/**
 * Module 12: Responsive Design
 *
 * %title = Module 12: Responsive Design
 * %route = /lesson/responsive
 * %isLazy = false
 * %isHome = true
 */

import Collapsable from './Components/Collapsable'

import Breakpoints from './Components/Responsive/Breakpoints'
//import Responsive from './Components/Responsive/Responsive'

const Responsive = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={false} title="Breakpoints">
			<Breakpoints />
		</Collapsable>,
		/*<Collapsable key={i++} collapse={true} title="Responsive">
			<Responsive />
		</Collapsable>,*/
	]

	return (
		<div className="h-full flex flex-col justify-start items-strech">
			<h1 className="my-4 text-5xl self-center">Responsive Design</h1>

			{lessons}
		</div>
	)
}

export default Responsive
