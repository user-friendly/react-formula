/**
 * Pave view router.
 */

import { useState } from 'react'

import NotFound from './Page/NotFound'

let updateViewState = () => {}

const UpdateView = (newView) => {
	updateViewState(newView)
}

const PageView = ({children, view = <NotFound />}) => {
	const [_view, setView] = useState(view)
	
	updateViewState = (newView) => {
		setView(newView)
	}
	
	return <>{_view}</>
}

export { UpdateView }
export default PageView
