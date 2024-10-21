import _ from 'lodash'

class VectorArray {
	#dim = 3
	#buffer = null
	
	constructor (dimension = 2, verts = []) {
		// Set dimension, add an extra space for translation?
		this.#dim = dimension + 1
		// If not an array, assume self type.
		if (!_.isArray(verts)) {
			verts = verts.getBuffer()
		}
		if (verts.length % this.#dim !== 0) {
			throw Error(`Vertices array is not a multiple of ${this.#dim}.`)
		}
		this.#buffer = verts
	}
	
	getBuffer() {
		return [...this.#buffer]
	}
}

export default VectorArray
