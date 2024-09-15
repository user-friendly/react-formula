/**
 * Simple navigational bar.
 */

const NavBar = ({children}) => {
	console.log('Render NavBar component.')

	return <div className="
		text-lg
		font-semibold
		font-mono
		
		text-stone-800
		
		p-2
		
		flex flex-row flex-wrap gap-2
		justify-center
  	 ">
		{children}
	</div>
}

export default NavBar
