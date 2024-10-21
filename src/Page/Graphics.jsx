/**
 * Graphics page view.
 */

import _ from 'lodash'

import {useRef, useState, useEffect, useLayoutEffect} from 'react'

import Router from '#Router'
import RenderEngine from '#Graphics/RenderEngine'

import {DrawPointV2d, DrawVector2d} from '#Graphics/RenderEngine'
import {Dot2d, Dot3d, Len2d, Len3d} from '#Graphics/Linear'

import MersenneTwister from 'mersennetwister'

export const PAGE_TITLE = 'Graphics Experimentation'

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
			
			vecs.push(v)
		}
		
		graphics.render((ctx, d) => {
			for (const v2d of vecs)
				DrawPointV2d(ctx, v2d)
			return true
		})
		
		const v1 = {x: 128, y: 128}
		const v2 = _.clone(v1)
		v2.y = v2.y * 2
		
		graphics.render((ctx, d) => {
			DrawVector2d(ctx, v1)
			DrawVector2d(ctx, v2)
			return true
		})
		
		// Screen resize service handler.
		const resizeObserver = new ResizeObserver((entries) => {
			const wrapper = entries[0].contentRect
			if (graphics) {
				graphics.onResize(wrapper.width, wrapper.height)
			}
		})
		resizeObserver.observe(canvasWrapperRef.current)
		return () => {
			if (graphics) {
				graphics.pause()
				graphics = null
			}
			resizeObserver.unobserve(canvasWrapperRef.current)
		}
	}, [])

	const buttonStyle = "my-2 mx-1 px-2 py-1 bg-blue-500 text-xl text-white rounded-md hover:bg-blue-600 active:bg-blue-700 disabled:bg-neutral-400"
	
	const canvasWrapperStyle = fullscreen ? 'fixed inset-0 w-screen h-screen'
		: 'flex-1 self-stretch border-2 border-gray-700' ;
	
	let ControlPanel = <>
		{fullscreen ? <button className={buttonStyle} onClick={() => setFullscreen(false)}>Exit Fullscreen ⬇</button>
			: <button className={buttonStyle} onClick={() => setFullscreen(true)}>Fullscreen ↕</button>}
		
		{pause ? <button className={buttonStyle} onClick={() => {setPause(!pause); graphics.pause()}}>Pause ⏸</button>
			: <button className={buttonStyle} onClick={() => {setPause(!pause); graphics.start()}}>Play ▶</button>}
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

Router.setRoute('/graphics', <Graphics />, PAGE_TITLE)

export default Graphics
