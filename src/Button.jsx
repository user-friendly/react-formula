/**
 * Button component.
 */

import { NavigateTo as navTo } from './PageView'

const style = `
	select-none
	cursor-pointer
	
	px-2.5
	
	rounded-xl
	bg-sky-400
	
	transition-bg
`;

const Button = ({children, route, type = 'button', onClick}) => {
	if (route === undefined) {
		return <button type={type} onClick={onClick} className={style}>
			{children}
		</button>
	} else {
		if (onClick === undefined) {
			onClick = (e) => {e.preventDefault(); navTo(route)}
		}
		return <a href={route} onClick={onClick} className={style}>
			{children}
		</a>
	}
}

export default Button
