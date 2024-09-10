/**
 * Pave view router.
 */

import { useState/*, lazy, Suspense*/ } from 'react'

import NotFound		from './Page/NotFound'
import Home			from './Page/Home'

import ButtonComponentExercise from './Page/Lesson/ButtonComponentExercise'
import FlexExercise	from './Page/Lesson/FlexExercise'

class Router {
	#map = {}
	#e404 = null
	
	constructor() {
		this.#e404 = <NotFound />
	}
	
	addRoute(path, component) {
		this.#map[path] = component
	}
	
	getPage(path) {
		return this.#map[path] !== undefined ? this.#map[path] : this.#e404
	}
}

let navigateTo = null

const router = new Router()

router.addRoute('/',			<Home />)
router.addRoute('/home',		<Home />)

router.addRoute('/lesson/button-component-exercise', <ButtonComponentExercise />)
router.addRoute('/lesson/flex-exercise', <FlexExercise />)

router.addRoute('/lesson',		<FlexExercise />)

const PageView = () => {
	const [pathname, setPathname] = useState(window.location.pathname)

	navigateTo = (path) => {
		setPathname(path)
		console.log(`Navigate to page view: \`${path}\``)
	}
	
	return <>{router.getPage(pathname)}</>
}

export { navigateTo as NavigateTo }
export default PageView
