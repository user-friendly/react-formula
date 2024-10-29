
import Renderable from './Renderable'

class UiTextBoxImpl extends Renderable {
	#text
	#x
	#y
	#z
	#fontStyle = '30px Tiny5'
	#fillStyle = 'black'
	
	constructor (text, x, y, font, fill) {
		super()
		
		this.#text = typeof text === 'function' ? text : () => text
		this.#x = x
		this.#y = y
		this.#fontStyle = font !== undefined ? font : this.#fontStyle
		this.#fillStyle = fill !== undefined ? fill : this.#fillStyle
	}
	
	frame(delta, renderer) {
		renderer.drawUiText(this.#text(), this.#x, this.#y, this.#fontStyle, this.#fillStyle)
	}
	
	setPosition(x, y, z) {
		[this.#x, this.#y, this.#z] = [x, y, z]
		return this 
	}
}

const UiTextBox = (text, x, y, font, fill) => {
	return new UiTextBoxImpl(text, x, y, font, fill)
}

export default UiTextBox
