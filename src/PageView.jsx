/**
 * Pave view router.
 */

import { useState/*, lazy, Suspense*/ } from 'react'

import NotFound		from './Page/NotFound'
import Home			from './Page/Home'
import Portfolio	from './Page/Portfolio'

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

/*
const PageHome = lazy(() => import('./Page/Home'))
const PagePort = lazy(() => import('./Page/Portfolio'))
*/

router.addRoute('/',			<Home />)
router.addRoute('/home',		<Home />)
router.addRoute('/portfolio',	<Portfolio />)

/*const Loading = () => {
	return <strong>
		🌀 Loading...
	</strong>
}*/

const PageView = () => {
	const [pathname, setPathname] = useState(window.location.pathname)

	navigateTo = (path) => {
		setPathname(path)
		console.log(`Navigate to page view: \`${path}\``)
	}
	
	// return <Suspense fallback={<Loading />}>{router.getPage(pathname)}</Suspense>
	return <>{router.getPage(pathname)}</>
}

export { navigateTo as NavigateTo }
export default PageView
