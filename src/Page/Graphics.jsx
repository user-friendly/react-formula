/**
 * Graphics page view.
 */

import _ from 'lodash'

import {useRef, useState, useEffect, useLayoutEffect} from 'react'

import Router from '#Router'

export const PAGE_TITLE = 'Graphics Experimentation'

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

class RenderEngine {
	#canvas = null
	#context = null
	
	#run = false
	
	#avrgDelta = null
	
	#totalTime = 0
	#totalFrames = 0
	
	#debug = false
	#reportInterval = 1500
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
		
		this.draw()
		
		if (this.#run) {
			requestAnimationFrame(this.frame.bind(this))
		} else if (this.#debug) {
			console.log('average delta: ', this.#avrgDelta.get())
			console.log(`total frames: ${this.#totalFrames}, total time: ${this.#totalTime}`)
		}
	}
	
	draw() {
		// TODO Draw something.
	}
}

let render = null

const Graphics = () => {
	const [pause, setPause] = useState(true)
	const canvasWrapperRef = useRef(null)
	const canvasRef = useRef(null)
	
	useLayoutEffect(() => {
		const canvas = canvasRef.current
		const resizeCanvas = () => {
			canvas.width = canvasWrapperRef.current.clientWidth
			canvas.height = canvasWrapperRef.current.clientHeight
		}
		resizeCanvas()
	    
		render = new RenderEngine(canvas)
		render.start()
		
		window.addEventListener('resize', resizeCanvas)
		return () => {
			if (render) {
				render.pause()
				render = null
			}
			window.removeEventListener('resize', resizeCanvas)
		}
	}, [])

	return (<div className="h-full flex flex-col items-center">
		<h2 className="m-4 text-4xl text-center">{PAGE_TITLE}</h2>
		<div className="mb-4 text-3xl">
			{pause ? <button onClick={() => {setPause(!pause); render.pause()}}>⏸</button>
				: <button onClick={() => {setPause(!pause); render.start()}}>▶</button>}
		</div>
		<div ref={canvasWrapperRef} className="flex-1 self-stretch border-2 border-gray-700">
			<canvas ref={canvasRef} />
		</div>
	</div>)
}

Router.setRoute('/graphics', <Graphics />, PAGE_TITLE)

export default Graphics
