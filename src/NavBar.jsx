/**
 * Simple navigational bar.
 */

const NavBar = ({children}) => {
	return (
		<div className="text-lg font-semibold font-mono text-stone-800 p-2 flex flex-row flex-wrap gap-2 justify-center">
			{children}
		</div>
	)
}

export default NavBar
