/**
 * Main loops and event loops?! 
 */

const Loopy = () => {
	function dumbSleep(ms, debug=false) {
		let d = 0
		let elapsed = Date.now()
		while (Date.now() - elapsed < ms) {
			d++
		}
		if (debug) {
			console.log(`Counted ${d.toLocaleString()} sheep while sleeping.`)
		}
	}
	
	console.log('Launch timeout.')
	
	setTimeout(() => {
	  console.log('Timeout done.');
	}, 50);
	
	console.log('Launch anonymouse promise 1.');
	const x = (new Promise((r, e) => {
		dumbSleep(1000, true)
		console.log('resolve 1')
		r(1)
	})).then(r => {
		dumbSleep(1000, true)
		console.log(`Anonymouse promise resolved to '${r}'.`)
	})
	
	// dumbSleep(500, true)
	
	console.log('Launch anonymouse promise 2.')
	const y = (new Promise((r, e) => {
		dumbSleep(1000, true)
		console.log('resolve 2')
		r(2)
	})).then(r => {
		dumbSleep(1000, true)
		console.log(`Anonymouse promise resolved to '${r}'.`)
	})
	
	console.log('Script completed.')
}

export default Loopy
