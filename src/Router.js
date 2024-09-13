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
	// Current path.
	#current = null;
	
	// TODO Just use a Map class.
	#map = {}
	
	constructor() {
		this.#current = this.processPath(window.location.pathname)
	}
	
	getCurrent() {
		return this.getRoute([this.#current])
	}
	
	getCurrentPath() {
		return this.#current
	}
	
	addRoute(path, component, title) {
		console.log(`add route: ${path}`)
		this.#map[path] = new Route(path, component, title)
	}
	
	getRoute(path) {
		// TODO Fix this...
		return this.#map[path] !== undefined ? this.#map[path] : this.#map[undefined]
	}
	
	getPaths() {
		return _.keys(this.#map)
	}
	
	getRoutes() {
		// Pass a new "map" object, but keep the values as references.
		// DO NOT use _.cloneDeep() here.
		return _.clone(this.#map)
	}
	
	processPath(path) {
		path = _.trimEnd(path, ' /')
		// Check for homepage case.
		return path === '' ? '/' : path
	}
	
	navigate(path) {
		this.#current = this.processPath(path)
	}
}

const Router = new RouterImpl()

export default Router
