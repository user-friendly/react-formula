/**
 * Graphics page view.
 */

import _ from 'lodash'

import {useRef, useState, useEffect, useLayoutEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import RenderEngine from './Lib/RenderEngine'

import {Dot2d, Dot3d, Len2d, Len3d} from './Lib/Math/Linear'
import Mesh from './Lib/Mesh'
import UiTextBox from './Lib/UiTextBox'

import MersenneTwister from 'mersennetwister'

export const PAGE_TITLE = 'Graphics'

let graphics = null

const Graphics = () => {
	const [pause, setPause] = useState(true)
	const [fullscreen, setFullscreen] = useState(true)
	
	const canvasWrapperRef = useRef(null)
	const canvasRef = useRef(null)
	
	useLayoutEffect(() => {
		graphics = new RenderEngine(canvasRef.current)
		graphics.start()
		
		// Draws some random stuff.
		graphics.drawExample()
		
		let dir = 1
		let cTimer = 0
		const cDelay = 2000
		graphics.render((delta, renderer) => {
			if (cTimer >= cDelay) {
				cTimer = 0
				// renderer.moveCameraTo([0, 0, 1])
				dir *= -1
			}
			else {
				cTimer += delta
				renderer.translateCameraBy([-4 * dir, -4 * dir, 1])
			}
			return true
		})
		
		const getPRNGSample = (size, seed = performance.now(), offset = 0) => {
			const mt = new MersenneTwister(seed)
			const sample = []
			
			for (let i = 0; i < size + offset; i++) {
				if (i >= offset) {
					sample.push(mt.rnd())
				} else {
					mt.rnd()
				}
			}
			return sample
		}
		const maxSeed = 2**32
		const sampleSize = 128
		const sampleX = getPRNGSample(sampleSize, Math.random() * maxSeed)
		const sampleY = getPRNGSample(sampleSize, Math.random() * maxSeed)
		
		// Translate vector.
		const [tX, tY] = [ 20, 250]
		// Scale vector.
		const [sX, sY] = [600, 150]
		
		let v = null
		let vecs = []
		for (let i = 0; i < sampleSize; i++) {
			v = {x: sampleX[i], y: sampleY[i]}
			
			// Scale
			v.x = sX * v.x
			v.y = sY * v.y
			
			// Translate
			v.x = tX + v.x
			v.y = tY + v.y
			vecs.push(v.x, v.y, 1)
		}
		const noiseMesh = new Mesh(vecs)
		graphics.render((d, rd) => {
			rd.drawPoints(noiseMesh)
			return true
		})
		
		graphics.render((d, rd) => {
			// Accepts a vector buffer.
			rd.drawVector([
				128, 128, 1,
				128, 256, 1,
			])
			return true
		})
		
		let timer = 0
		const delay = 3000
		const textBox = UiTextBox('Hello, 2D Canvas!', 0, 0)
		graphics.render(textBox)
		graphics.render(((textBox, delta, renderer) => {
			if (timer >= delay) {
				timer = 0
				textBox.setPosition(
					Math.random() * (canvasRef.current.width - 150),
					Math.random() * (canvasRef.current.height - 100)
				)
			} else {
				timer += delta
			} 
			return true
		}).bind(null, textBox))
		
		
		const smallStep = 4
		const bigStep = 20
		const handleKeyPress = (event) => {
			const isModified =
				event.altKey || event.ctrlKey || event.metaKey

			if (!isModified) {
				if (event.code === 'ArrowLeft') {
					graphics.translateCameraBy([1 * (event.shiftKey ? bigStep : smallStep), 0, 1])
				}
				
				if (event.code === 'ArrowRight') {
					graphics.translateCameraBy([-1 * (event.shiftKey ? bigStep : smallStep), 0, 1])
				}
				
				if (event.code === 'ArrowUp') {
					graphics.translateCameraBy([0, -1 * (event.shiftKey ? bigStep : smallStep), 1])
				}
				
				if (event.code === 'ArrowDown') {
					graphics.translateCameraBy([0, 1 * (event.shiftKey ? bigStep : smallStep), 1])
				}
				
				if (event.code === 'Enter') {
					console.log('enter pressed')
				}
			}
		}
		
		// Screen resize service handler.
		const resizeObserver = new ResizeObserver((entries) => {
			const wrapper = entries[0].contentRect
			if (graphics) {
				graphics.onResize(wrapper.width, wrapper.height)
			}
		})
		resizeObserver.observe(canvasWrapperRef.current)
		document.body.addEventListener('keydown', handleKeyPress)
		return () => {
			if (graphics) {
				graphics.stop()
				graphics = null
			}
			resizeObserver.unobserve(canvasWrapperRef.current)
			document.body.removeEventListener('keydown', handleKeyPress)
		}
	}, [])
	
	
	
	const buttonStyle = "my-2 mx-1 px-2 py-1 bg-blue-500 text-xl text-white rounded-md hover:bg-blue-600 active:bg-blue-700 disabled:bg-neutral-400"
	
	const canvasWrapperStyle = fullscreen ? 'fixed inset-0 w-screen h-screen'
		: 'flex-1 self-stretch border-2 border-gray-700' ;
	
	let ControlPanel = <>
		<Link className={buttonStyle} to="/home">Back Home</Link>
		
		{fullscreen ? <button className={buttonStyle} onClick={() => setFullscreen(false)}>Exit Fullscreen ⬇</button>
			: <button className={buttonStyle} onClick={() => setFullscreen(true)}>Fullscreen ↕</button>}
		
		{pause ? <button className={buttonStyle} onClick={() => {setPause(!pause); graphics.pause()}}>Pause ⏸</button>
			: <button className={buttonStyle} onClick={() => {setPause(!pause); graphics.start()}}>Play ▶</button>}
		
		<button className={buttonStyle} onClick={() => {graphics.stop()}}>Stop ⏹</button>
	</>
	
	return (<div className="h-full flex flex-col items-center">
		<h2 className="m-4 text-4xl text-center">{PAGE_TITLE}</h2>
		<div className="mb-4 text-3xl">
			{ControlPanel}
		</div>
		<div ref={canvasWrapperRef} className={canvasWrapperStyle}>
			<canvas ref={canvasRef} className={fullscreen ? " absolute inset-0" : null} />
			{fullscreen ?
				<div className="absolute top-1 right-1">
					{ControlPanel}
				</div>
			: null}
		</div>
	</div>)
}

export default Graphics
