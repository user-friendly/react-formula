
import {useState} from 'react'
import {Link} from 'react-router-dom'
import AppSwitcher from '#AppSwitcher'
import clsx from 'clsx'

const linkStyle = `
	text-xl font-medium hover:underline
	py-6 pl-8 text-violet-300
	md:mx-4 md:text-inherit md:p-0
`

const menuStyle = `
	bg-violet-900 text-violet-400
	
	pb-6 fixed top-0 right-0 w-48 rounded-bl-lg roudned-tr-lg
	flex flex-col
	
	md:block md:static md:p-0 md:w-auto md:text-inherit md:bg-transparent
`

const closeButton = `md:hidden self-end mt-8 mr-4 p-3 rounded-full bg-violet-500`

const NavBar = (props) => {
	const [showMobile, setShowMobile] = useState(false)
	
	return <div className="mb-8 flex justify-center shadow-lg bg-violet-50"> 
		<div className="w-full max-w-6xl py-4 px-4 flex justify-center items-center
		">
			<img className="w-20 md:w-24" src="https://static-task-assets.react-formula.com/899963.png" title="hashtag" />
			<h1 className="ml-4 font-ubuntu text-4xl">hasher</h1>
			
			<div className="flex-1 flex justify-end ">
				<div className="md:hidden text-4xl">
					<button onClick={() => setShowMobile(true)} type="button">🍔</button>
				</div>
				<div className={clsx(
					menuStyle,
					!showMobile && "hidden"
				)}>
					<button className={closeButton} onClick={() => setShowMobile(false)} type="button"
						>❌</button>
					<AppSwitcher className={linkStyle} appid="default">Main App</AppSwitcher>
					<Link className={linkStyle} to="/about">About</Link>
					<Link className={linkStyle} to="/contact">Contact</Link>
					<Link className={clsx(linkStyle, "hover:no-underline ")}
						to="https://www.duckduckgo.com/" target="_blank"	
					>🔍</Link>
				</div>
			</div>
		</div>
	</div>
}

export default NavBar
