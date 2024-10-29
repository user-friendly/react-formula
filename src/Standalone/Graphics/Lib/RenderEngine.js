
import {MatrixMultiply2d, MatrixMultiply2dVerts, Matrix2dToString, Identity2d} from './Math/Linear'
import {FormatTotalTime, Average} from './Utilities'
import Renderable from './Renderable'
import Mesh from './Mesh'
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
	
	// Transform scene coordinates to  
	#cameraMat
	// Transform viewport coordinates to canvas coords.
	#canvasMat
	// Final transformation matrix.
	#finalMat
	
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
		
		this.#cameraMat = Identity2d()
		
		this.#canvasMat = [
			1,  0, 0,
			0, -1, this.#canvas.height,
			0,  0, 1,
		]
		
		this.#recalcFinalMat()
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
			if (true === call(this.#delta, this)) {
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
	
	#recalcFinalMat() {
		this.#finalMat = MatrixMultiply2d(this.#canvasMat, this.#cameraMat)
	}
	
	moveCameraTo(vert) {
		this.#cameraMat[2] = vert[0]
		this.#cameraMat[5] = vert[1]
		this.#recalcFinalMat()
	}
	
	translateCameraBy(vert) {
		this.#cameraMat = MatrixMultiply2d(this.#cameraMat, [
			1, 0, -vert[0],
			0, 1, -vert[1],
			0, 0, vert[2],
		])
		this.#recalcFinalMat()
	}
		
	getCameraMat() {
		return this.#cameraMat
	}
	
	getCanvasMat() {
		return this.#canvasMat
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
	 * - delta:    Frame delta - time passed since last frame.
	 * - renderer: RenderEngine instance.
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
		this.render(new DrawExample())
	}
	
	drawMesh(mesh) {
		const verts = mesh.getVerts()
		MatrixMultiply2dVerts(this.#finalMat, verts)
		
		this.#context.beginPath()
		this.#context.moveTo(verts[0], verts[1])
		
		const vCount = verts.length / 3
		for (let offset = 1; offset < vCount; offset++) {
			this.#context.lineTo(verts[0 + 3*offset], verts[1 + 3*offset])
		}
		this.#context.closePath()
		
		this.#context.fillStyle = "blue"
		this.#context.fill()
		this.#context.strokeStyle = "black"
		this.#context.stroke()
	}
	
	drawUiText(text, x, y, font, fill) {
		[x, y] =  MatrixMultiply2d(this.#canvasMat, [x, y, 1])
		// TODO Could be beneficial to bundle up texts with similar fonts/fills.
		this.#context.font = font
		this.#context.fillStyle = fill
		this.#context.fillText(text, x, y)
	}

	/**
	 * Draws a single point.
	 * 
	 * Should be used for debugging.
	 * Very expensive. Can be replaced with fillRect().
	 */
	drawPoints(mesh) {
		const verts = mesh.getVerts()
		MatrixMultiply2dVerts(this.#finalMat, verts)
		
		const vCount = verts.length / 3
		for (let offset = 0; offset < vCount; offset++) {
			this.#context.beginPath()
			this.#context.arc(verts[0 + 3*offset], verts[1 + 3*offset], 1, 0, RAD_360)
			this.#context.stroke()
		}
	}

	// Mostly for debug purposes.
	drawVector(verts) {
		const tVerts = Array.from(verts)
		MatrixMultiply2dVerts(this.#finalMat, tVerts)
		const origin = MatrixMultiply2d(this.#finalMat, [0, 0, 1])
		
		const vCount = tVerts.length / 3
		for (let offset = 0; offset < vCount; offset++) {
			this.#context.beginPath()
			this.#context.moveTo(origin[0], origin[1])
			this.#context.lineTo(tVerts[0 + 3*offset], tVerts[1 + 3*offset])
			this.#context.closePath()
			this.#context.stroke()
		}
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
		
		// Update canvas matrix.
		this.#canvasMat = [
			1,  0, 0,
			0, -1, this.#canvas.height,
			0,  0, 1,
		]
		this.#recalcFinalMat()
		
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
		
		this.fpsDebugTextBox = UiTextBox((() => `FPS: ${this.#fpsLast}`).bind(this), this.#canvas.width - 125, 15)
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

class DrawExample extends Renderable {
	#mesh
	
	constructor () {
		super()
		
		const verts = [
			25,   25, 1,
			125,  25, 1,
			75,  125, 1,
		]
		MatrixMultiply2dVerts([
			1, 0, 200,
			0, 1, 100,
			0, 0,   1,
		], verts)
		this.#mesh = new Mesh(verts)
	}
	
	frame(delta, renderer) {
		renderer.drawMesh(this.#mesh)
	}
}

export default RenderEngine
