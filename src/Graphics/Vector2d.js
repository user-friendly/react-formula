class Vector2d {
	x
	y
	w = 1
	
	constructor (x = 0, y = 0) {
		if (typeof x === 'number') {
			this.x = x
			this.y = y
		} else if (typeof x === 'object') {
			if (x.z !== undefined) {
				this.#fromV3(x)
			} else {
				this.#fromV2(x)
			}
		} else {
			throw Error('Invalid X argument.')
		}
	}
	
	#fromV2(v) {
		this.x = v.x
		this.y = v.y
		this.w = v.w
	}
	
	#fromV3(v) {
		this.#fromV2(v)
	}
}

export default Vector2d
