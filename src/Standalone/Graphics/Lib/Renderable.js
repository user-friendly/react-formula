
class Renderable {
	#remove = false
	frame(delta, renderer) {
		throw "TODO Override!"
	}
	// context, delta, renderer
	render(ctx, d, rd) {
		this.frame(d, rd)
		return !this.#remove
	}
	remove() {
		this.#remove = true
	}
}

export default Renderable
