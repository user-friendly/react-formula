/**
 * Graphics page view.
 */

import _ from 'lodash'

import {useRef, useState, useEffect, useLayoutEffect} from 'react'

import Router from '#Router'

import RenderEngine from '#Graphics/RenderEngine'

export const PAGE_TITLE = 'Graphics Experimentation'

let render = null

const Graphics = () => {
	const [pause, setPause] = useState(true)
	const canvasWrapperRef = useRef(null)
	const canvasRef = useRef(null)
	
	useLayoutEffect(() => {
		const canvas = canvasRef.current
		const resizeCanvas = () => {
			if (render) {
				render.onResize(
					canvasWrapperRef.current.clientWidth,
					canvasWrapperRef.current.clientHeight
				)
			}
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
