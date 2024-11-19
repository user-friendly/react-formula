
import {Link} from 'react-router-dom'
import Links from './Links'

const Bar = () => {
	return <nav className="navbar hidden sm:flex justify-center bg-emerald-800">
		<div className="w-full max-w-5xl flex p-8 justify-end items-center text-white">
			<div className="flex-1 flex">
				<Link to="/" className="p-2 flex justify-start items-center">
					<img className="w-10" title="brand logo"
						src="https://static-task-assets.react-formula.com/capstone_logo_light.png" />
					<span className="ml-4 font-playfair text-2xl">Rica's Plants</span>
				</Link>
			</div>
			
			<Links />
		</div>
	</nav>
}

export default Bar
