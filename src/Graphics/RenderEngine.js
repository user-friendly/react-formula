
const RAD_360 = 2 * Math.PI

class RenderEngine {
	#canvas = null
	#context = null
	
	#run = false
	
	#avrgDelta = null
	
	#totalTime = 0
	#totalFrames = 0
	
	#debug = true
	#reportInterval = 30000
	#reportLast = 0
	
	#delta = 0
	#last = 0
	
	constructor(canvas = null) {
		this.#canvas = canvas
		this.#context = this.#canvas.getContext('2d')
	}
	
	start() {
		console.log('Start render engine.')
		
		this.#run = true
		
		this.#avrgDelta = new Avrg()
		this.#reportLast = 0
		
		this.#last = performance.now()
		
		requestAnimationFrame(this.frame.bind(this))
		return this
	}
	
	pause() {
		console.log('Pause render engine.')
		
		this.#run = false
		return this
	}
	
	frame(ts) {
		this.#delta = ts - this.#last
		this.#last = ts
		
		if (this.#debug) {
			this.#totalTime += this.#delta
			this.#totalFrames += 1
			this.#avrgDelta.step(this.#delta)
			
			if (this.#reportLast > this.#reportInterval) {
				this.#reportLast = 0
				console.log('delta: ', this.#avrgDelta.get())
				this.#avrgDelta = new Avrg()
			} else {
				this.#reportLast += this.#delta
			}
		}
		
		// Clear screen.
		this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
		// Draw frame.
		this.#draw()
		
		if (this.#run) {
			requestAnimationFrame(this.frame.bind(this))
		} else if (this.#debug) {
			console.log('average delta: ', this.#avrgDelta.get())
			console.log(`total frames: ${this.#totalFrames}, total time: ${this.#totalTime}`)
		}
	}
	
	#draw() {
		this.#context.beginPath()
		this.#context.moveTo(50, 140)
		this.#context.lineTo(150, 60)
		this.#context.lineTo(250, 140)
		this.#context.closePath()
		this.#context.stroke()
		
		let oX = this.#canvas.width / 2
		let oY = this.#canvas.height / 2
		this.#drawPoint(oX, oY)
	}
	
	/**
	 * Draws a single point.
	 * 
	 * Should be used for debugging.
	 * Very expensive. Can be replaced with fillRect().
	 */
	#drawPoint(x, y) {
		this.#context.beginPath()
		this.#context.arc(x, y, 1, 0, RAD_360)
		this.#context.stroke()
	}
	
	/**
	 * Resize handler.
	 * 
	 * Should be called before the setting canvas props.
	 */
	onResize(width, height) {
		// handle resize
		// console.log(`RenderEngine.onResize(${width}, ${height})`)
	}
}

class Avrg {
	#total = 0
	#count = 0
	
	step(value) {
		this.#total += value
		this.#count += 1
		return this
	}
	
	get() {
		return this.#total / this.#count
	}
}

export {Avrg}
export default RenderEngine
