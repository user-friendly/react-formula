/**
 * Button component.
 */

const style = `
	select-none
	cursor-pointer
	
	px-2.5
	
	rounded-xl
	bg-sky-400
	
	transition-bg
`;

const Button = ({children, route, type = 'button', onClick = e => {}}) => {
	if (route === undefined) {
		return <button type={type} onClick={e => onClick(e, route)} className={style}>
			{children}
		</button>
	} else {
		return <a href={route} onClick={e => {e.preventDefault(); onClick(e, route)}} className={style}>
			{children}
		</a>
	}
}

export default Button
