
import {MatrixMultiply2d, Matrix2dToString} from './Math/Linear'
import {FormatTotalTime, Average} from './Utilities'
import UiTextBox from './UiTextBox'

const RAD_360 = 2 * Math.PI

class RenderEngine {
	#canvas
	#context
	
	#drawCalls
	#run
	#stop
	
	#background
	
	// Most recent frame's delta (time between current frame and previous frame).
	#delta
	// Most recent frame's timestamp.
	#lastTs
	
	// Reporting vars.
	#debug = true
	// Utility: average calc object.
	#avrgDelta
	// The average of the frame deltas.
	#avrgDeltaLast
	// Accumulated total deltas. This is the time between renders and
	// should include busy CPU time (i.e. drawing work). Needs testing.
	#totalTime
	// Accumulated frames.
	#totalFrames
	#reportInterval
	#reportTime
	
	/**
	 * The totals, frames & time, are the gathared
	 * over the interval (in ms)/
	 */
	#fpsFrames
	#fpsTime
	#fpsInterval
	// Just the last FPS value calculated.
	#fpsLast
	
	constructor(canvas = null) {
		this.#canvas = canvas
		this.#context = this.#canvas.getContext('2d')
		this.#init()
	}
	
	// Initializer, also can act as a reset.
	#init() {
		this.#drawCalls = []
		
		this.#run = false
		this.#stop = false
			
		this.#background = 'rgb(255, 255, 255)'

		this.#delta = 0
		this.#lastTs = 0

		this.#avrgDelta = null
		this.#totalTime = 0
		this.#totalFrames = 0
		this.#avrgDeltaLast = 0
		// In milliseconds.
		this.#reportInterval = 60000
		this.#reportTime = 0
		
		this.#fpsFrames = 0
		this.#fpsTime = 0
		this.#fpsInterval = 5000
		this.#fpsLast = 0
	}
	
	start() {
		console.log('Start render engine.')
		
		this.#run = true
		
		this.#avrgDelta = new Average()
		this.#reportTime = 0
		
		this.#lastTs = performance.now()
		
		if (this.#debug) {
			this.showFpsDebug()
		}
		
		requestAnimationFrame(this.frame.bind(this))
		return this
	}
	
	pause() {
		console.log('Pause render engine.')
		this.#run = false
		return this
	}
	
	stop() {
		console.log('Stop render engine.')
		this.#stop = true
		return this
	}
	
	frame(ts) {
		this.#delta = ts - this.#lastTs
		this.#lastTs = ts
		
		if (this.#debug) {
			this.#reportFrame()
		}
		
		// Clear screen.
		this.#clear()
		// Draw frame.
		this.#draw()
		
		if (this.#run && false === this.#stop) {
			requestAnimationFrame(this.frame.bind(this))
		} else {
			if (this.#debug) {
				this.#reportStats()
			}
			if (false !== this.#stop) {
				this.#init()
			}
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
	
	getTransformMat() {
		return [
			1,  0, 0,
			0, -1, this.#canvas.height,
			0,  0, 1,
		]
	}
	
	getViewportSize() {
		return [this.#canvas.width, this.#canvas.height]
	}
	
	getCanvasSize() {
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
		if (typeof callback === 'object' && typeof callback.render !== undefined
			&& typeof callback.render === 'function'
		) {
			this.#drawCalls.push(callback.render.bind(callback))
		} else if (typeof callback === 'function') {
			this.#drawCalls.push(callback)
		}
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
			
			const oX = rd.getCanvasSize()[0] / 2
			const oY = rd.getCanvasSize()[1] / 2
			
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
		
		if (this.#debug) {
			this.showFpsDebug()
		}
	}
	
	///////////////////////////
	//     DEBUG Methods     //
	///////////////////////////
	
	/**
	 * Call on each frame.
	 */
	#reportFrame() {
		this.#totalTime += this.#delta
		this.#totalFrames += 1
		this.#avrgDelta.step(this.#delta)
		
		this.#reportFps()
		
		if (this.#reportTime > this.#reportInterval) {
			// Save average delta.
			this.#avrgDeltaLast = parseInt(this.#avrgDelta.get())
			this.#reportTime = 0
			this.#avrgDelta = new Average()
			
			console.log(`Average delta: ${this.#avrgDeltaLast} ms`)
		} else {
			this.#reportTime += this.#delta
		}
	}
	
	/**
	 * Called on each frame.
	 */
	#reportFps() {
		if (this.#fpsTime > this.#fpsInterval) {
			this.#fpsLast = parseInt((this.#fpsFrames / this.#fpsTime) * 1000)
			this.#fpsFrames = 0
			this.#fpsTime = 0
			
			console.log('FPS:', this.#fpsLast)
		}
		else {
			this.#fpsFrames += 1
			this.#fpsTime += this.#delta
		}
	}
	
	showFpsDebug(ctx, d, rd) {
		this.hideFpsDebug()
		const getFpsDebugText = () => `FPS: ${this.#fpsLast}`
		
		const viewportVert = [this.#canvas.width - 125, 15, 1]
		const canvasVert = MatrixMultiply2d(this.getTransformMat(), viewportVert)
		
		this.fpsDebugTextBox = UiTextBox(getFpsDebugText.bind(this), canvasVert[0], canvasVert[1])
			// this.#canvas.width - 125, this.#canvas.height - 15)
		this.render(this.fpsDebugTextBox)
	}
	hideFpsDebug() {
		if (this.fpsDebugTextBox !== undefined) {
			this.fpsDebugTextBox.remove()
		}
	}
	
	#reportStats() {
		this.#reportFps()
		console.log(`Average delta: ${this.#avrgDeltaLast} ms`)
		console.log(`Total, frames: ${this.#totalFrames}, render time: ${FormatTotalTime(this.#totalTime)}`)
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

// Mostly for illustration purposes.
function DrawPointV2d(ctx, vr) {
	ctx.beginPath()
	ctx.arc(vr.x, vr.y, 1, 0, RAD_360)
	ctx.stroke()
}

// Mostly for illustration purposes.
function DrawVector2d(ctx, vr) {
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(vr.x, vr.y)
	ctx.closePath()
	ctx.stroke()
}

export {DrawPoint, DrawPointV2d, DrawVector2d}
export default RenderEngine
