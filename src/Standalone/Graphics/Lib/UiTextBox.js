
class UiTextBoxImpl {
	#isDisplayed
	#text
	#x
	#y
	#fontStyle = '30px Tiny5'
	#fillStyle = 'black'
	
	constructor (text, x, y, font, fill) {
		this.#isDisplayed = true
		this.#text = typeof text === 'function' ? text : () => text
		this.#x = x
		this.#y = y
		this.#fontStyle = font !== undefined ? font : this.#fontStyle
		this.#fillStyle = fill !== undefined ? fill : this.#fillStyle
	}
	
	// context, delta, renderer
	render(ctx, d, rd) {
		// TODO Could be beneficial to bundle up texts with similar fonts/fills.
		ctx.font = this.#fontStyle
		ctx.fillStyle = this.#fillStyle
		ctx.fillText(this.#text(), this.#x, this.#y)
		return this.#isDisplayed
	}
	remove() {
		this.#isDisplayed = false
	}
}

const UiTextBox = (text, x, y, font, fill) => {
	return new UiTextBoxImpl(text, x, y, font, fill)
}

export default UiTextBox
