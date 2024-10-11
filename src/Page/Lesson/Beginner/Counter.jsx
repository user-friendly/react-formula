/**
 * Counter.
 * 
 * Path: /lesson/counter
 */

import _ from 'lodash'

import { useState, useEffect } from 'react'

// TODO Base velocity on time between clicks.

const m = 2
const step = 1
const dMax = 16
const dInit = 1
// Reset delta after ms.
const resetDelay = 1000

const counterInital = {
	n: 0,
	// Delta.
	d: dInit,
	tId: null
}

const calcStep = (c) => {
	const v = m ** c.d
	
	if (c.d < dMax)
		c.d += 1
	
	/*console.log(`delta: ${c.d}`)
	console.log(`velocity: ${v}`)
	console.log(`step: ${v * step}`)*/
	
	return parseInt(v * step)
}

const forward = (c, speedUp = false) => {
	if (speedUp) {
		c.n += calcStep(c)
	} else {
		c.n += step
	}
	return _.create({}, c)
}

const backward = (c, speedUp = false) => {
	if (speedUp) {
		c.n -= calcStep(c)
	} else {
		c.n -= step
	}
	return _.create({}, c)
}

const styleAnimate = {
}

const Counter = () => {
	const [counter, setCounter] = useState(counterInital)
	
	// The effect will run after the component is mounted.
	useEffect(() => {
		// Only reset, if the delta has changed.
		if (counter.d > dInit) {
			counter.tId = setTimeout(() => {
				console.log(`reset delta to: ${dInit}`)
				// Resets the delta.
				counter.d = dInit
				setCounter(_.create({}, counter))
			}, resetDelay)
		} else {
			console.log('delta is unchanged')
		}
		
		return () => {
			if (counter.tId) {
				console.log('cancel timeout')
				clearTimeout(counter.tId)
			}
		}
	}, [counter])
	
	// Dynamic background.
	const opacity = (counter.d-1)/(dMax-1)
	
	return <div className="h-full flex flex-col justify-center items-center text-3xl font-noto">
	
		<span className="p-4 mb-4 rounded-xl text-black text-6xl text-center"
			style={{'backgroundColor': `rgba(239, 68, 68, ${opacity})`}}
		>{counter.n}</span>

		<div className="flex flex-row justify-center items-center gap-x-8">
			<button
				onClick={(e) => setCounter(backward(counter, true))}
				className="p-4 bg-red-300 text-white rounded-lg"
			>➖➖</button>
			<button
				onClick={(e) => setCounter(backward(counter))}
				className="p-4 bg-red-400 text-white rounded-lg"
			>➖</button>
			
			<button
				onClick={(e) => setCounter(forward(counter))}
				className="p-4 bg-green-400 text-white rounded-lg"
			>➕</button>
			<button
				onClick={(e) => setCounter(forward(counter, true))}
				className="p-4 bg-green-300 text-white rounded-lg"
			>➕➕</button>
		</div>
	</div>
}

// Router.setRoute('/lesson/counter', <Counter />, 'Counter Exercise')

export default Counter
