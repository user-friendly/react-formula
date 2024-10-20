
import Vector2d from './Vector3d'

const RAD_360 = 2 * Math.PI

class RenderEngine {
	#canvas = null
	#context = null
	
	#drawCalls = []
	
	#run = false
	
	#background = 'rgb(255, 255, 255)'
	
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
		this.#clear()
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
		const calls = this.#drawCalls
		this.#drawCalls = []
		
		let call = null
		while (call = calls.shift()) {
			if (true === call(this.#context, this.#delta, this)) {
				this.#drawCalls.push(call)
			}
		}
		
		return this
	}
	
	#clear() {
		this.#context.fillStyle = this.#background
		this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
		// this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
		return this
	}
	
	getViewport() {
		return [this.#canvas.width, this.#canvas.height]
	}
	
	/**
	 * A function to call on each frame.
	 * 
	 * Callback signature is (ctx, d, rd) => bool:
	 * - ctx: Rendering context (2d or 3d).
	 * -   d: Frame delta - time passed since last frame.
	 * -  rd: RenderEngine instance.
	 * Return true to queue the callback for the next frame,
	 * or false remove it.
	 * 
	 * Callbacks are called in the order they were queued - FIFO.
	 */
	render(callback) {
		this.#drawCalls.push(callback)
		return this
	}
	
	drawExample() { 
		return this.render((ctx, d, rd) => {
			ctx.beginPath()
			ctx.moveTo(50, 140)
			ctx.lineTo(150, 60)
			ctx.lineTo(250, 140)
			ctx.closePath()
			ctx.stroke()
			
			const oX = rd.getViewport()[0] / 2
			const oY = rd.getViewport()[1] / 2
			
			ctx.beginPath()
			ctx.arc(oX, oY, 1, 0, RAD_360)
			ctx.stroke()
			
			return true
		})
	}
	
	/**
	 * Resize handler.
	 * 
	 * Should be called before the setting canvas props.
	 */
	onResize(width, height) {
		// handle resize
		// console.log(`RenderEngine.onResize(${width}, ${height})`)
		this.#canvas.width = width
		this.#canvas.height = height
	}
}

/**
 * Draws a single point.
 * 
 * Should be used for debugging.
 * Very expensive. Can be replaced with fillRect().
 */
function DrawPoint(ctx, x, y) {
	ctx.beginPath()
	ctx.arc(x, y, 1, 0, RAD_360)
	ctx.stroke()
} 

function DrawPointV2d(ctx, v2d) {
	ctx.beginPath()
	ctx.arc(v2d.x, v2d.y, 1, 0, RAD_360)
	ctx.stroke()
}

// TODO Move to a global (App) math class?
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

export {Avrg, DrawPoint, DrawPointV2d}
export default RenderEngine
