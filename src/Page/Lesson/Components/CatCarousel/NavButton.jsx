
const NavButton = ({children, onClick, visible = true}) => {
	return <button
		className={`font-noto text-4xl ${!visible ? 'invisible' : null}`}
		onClick={onClick}
	>
		{children}
	</button>
}

export default NavButton
