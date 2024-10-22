import _ from 'lodash'

class VertexBuffer {
	#dim	= null
	#buffer = null
	
	constructor (dimension = 3, verts = []) {
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

export default VertexBuffer
