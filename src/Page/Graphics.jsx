/**
 * Graphics page view.
 */

import _ from 'lodash'

import {useRef, useState, useEffect, useLayoutEffect} from 'react'

import Router from '#Router'
import RenderEngine from '#Graphics/RenderEngine'
import {DrawPointV2d} from '#Graphics/RenderEngine'
import Vector2d from '#Graphics/Vector2d'

import MersenneTwister from 'mersennetwister'

export const PAGE_TITLE = 'Graphics Experimentation'

let render = null

const Graphics = () => {
	const [pause, setPause] = useState(true)
	const [fullscreen, setFullscreen] = useState(false)
	
	const canvasWrapperRef = useRef(null)
	const canvasRef = useRef(null)
	
	useLayoutEffect(() => {
		render = new RenderEngine(canvasRef.current)
		render.start()
		
		// Draws some random stuff.
		render.drawExample()
		
		const yOffset = 250
		const xOffset = 50
		const xScale = 700
		
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
		const sample = getPRNGSample(128)
		
		let vecs = []
		for (const s of sample)
			vecs.push(new Vector2d(
				xOffset + s * xScale,
				yOffset
			))
		
		render.render((ctx, d) => {
			for (const v2d of vecs)
				DrawPointV2d(ctx, v2d)
			return true
		})
		
		// Screen resize service handler.
		const resizeObserver = new ResizeObserver((entries) => {
			const wrapper = entries[0].contentRect
			if (render) {
				render.onResize(wrapper.width, wrapper.height)
			}
		})
		resizeObserver.observe(canvasWrapperRef.current)
		return () => {
			if (render) {
				render.pause()
				render = null
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
		
		{pause ? <button className={buttonStyle} onClick={() => {setPause(!pause); render.pause()}}>Pause ⏸</button>
			: <button className={buttonStyle} onClick={() => {setPause(!pause); render.start()}}>Play ▶</button>}
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
