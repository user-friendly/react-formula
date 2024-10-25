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

import {Link} from 'react-router-dom'

const linkStyle=`text-xl select-none cursor-pointer
	px-2.5 py-0.5 rounded-xl bg-sky-400 transition-bg hover:bg-sky-500 hover:text-white`

const Responsive = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={true} title="Breakpoints">
			<Breakpoints />
		</Collapsable>,
		<Collapsable key={i++} collapse={false} title="Responsive">
			<div className="my-4 flex justify-center">
				<Link className={linkStyle} to="/standalone/mobile">
					To "Mobile Responsive Design" Site
				</Link>
			</div>
		</Collapsable>,
	]

	return (
		<div className="h-full flex flex-col justify-start items-strech">
			<h1 className="my-4 text-5xl self-center">Responsive Design</h1>

			{lessons}
		</div>
	)
}

export default Responsive
