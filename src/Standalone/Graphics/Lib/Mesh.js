
class Mesh {
	#verts
	#edges
	#faces
	
	constructor (verts, edges, faces) {
		this.#verts = verts
		this.#edges = edges
		this.#faces = faces
	}
	
	getVerts() {
		return Array.from(this.#verts)
	}
	
	getEdges() {
		return Array.from(this.#edges)
	}
	
	getFaces() {
		return Array.from(this.#faces)
	}	
}

export default Mesh
