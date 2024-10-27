
import {Link} from 'react-router-dom'

const linkStyle = "mx-4 text-xl font-medium hover:underline"

const NavBar = (props) => {
	return <div className="mb-8 flex justify-center shadow-lg bg-violet-50"> 
		<div className="w-full max-w-5xl py-4 px-4 flex justify-center items-center
		">
			<img className="w-20 md:w-24" src="https://static-task-assets.react-formula.com/899963.png" title="hashtag" />
			<h1 className="ml-4 font-ubuntu text-4xl">hasher</h1>
			
			<div className="flex-1 flex justify-end ">
				<div className="md:hidden text-4xl">
					🍔
				</div>
				<div className="hidden md:block">
					<Link className={linkStyle} to="/">Home</Link>
					<Link className={linkStyle} to="/about">About</Link>
					<Link className={linkStyle} to="/contact">Contact</Link>
					<Link className={linkStyle} to="https://www.duckduckgo.com/">🔍</Link>
				</div>
			</div>
		</div>
	</div>
}

export default NavBar
