/**
 * Router.
 */

import _ from  'lodash'

class Route {
	#path = ''
	#component = null
	#title = 'Undefined'

	constructor(path, component, title) {
		this.#path = path
		this.#component = component
		if (_.isString(title) && !_.isEmpty(title)) {
			this.#title = title
		}
	}
	
	get path() {
		return this.#path
	}
	
	get title() {
		return this.#title
	}
	
	get component() {
		return this.#component
	}
}

class RouterImpl {
	// TODO Just use a Map class.
	#map = {}
	
	#e404 = null
	
	getInitialRoute() {
		return this.getRoute(window.location.pathname)
	}

	setRoute(path, component, title) {
		path = this.processPath(path)
		console.log(`set route: ${path}, to: '${title}`)
		this.#map[path] = new Route(path, component, title)
	}
	
	getRoute(path) {
		path = this.processPath(path)
		// TODO Fix this...
		return this.#map[path] !== undefined ? this.#map[path] : this.#e404
	}
	
	getPaths() {
		return _.keys(this.#map)
	}
	
	getRoutes() {
		// Pass a new "map" object, but keep the values as references.
		// DO NOT use _.cloneDeep() here.
		return _.clone(this.#map)
	}
	
	setNotFound(notfound, title) {
		this.#e404 = new Route('<error_404>', notfound, title)
	}
	
	processPath(path) {
		path = _.trimEnd(path, ' /')
		// Check for homepage case.
		return path === '' ? '/' : path
	}
}

const Router = new RouterImpl()

export default Router
