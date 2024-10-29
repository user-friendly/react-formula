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

class VertexBuffer2d extends VertexBuffer {
	constructor(verts = []) {
		// x, y, w
		super(3, verts)
	}
}

class VertexBuffer3d extends VertexBuffer {
	constructor(verts = []) {
		// x, y, z, w
		super(4, verts)
	}
}

export {VertexBuffer2d, VertexBuffer3d}
export default VertexBuffer
