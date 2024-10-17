/**
 * Main loops and event loops?!
 */

export function dumbSleep(ms, debug = false) {
	let d = 0
	let elapsed = Date.now()
	while (Date.now() - elapsed < ms) {
		d++
	}
	if (debug) {
		console.log(`Counted ${d.toLocaleString()} sheep while sleeping.`)
	}
}

const Loopy = ({logger = null}) => {
	if (!logger) {
		logger = console
	}

	logger.log('Launch timeout.')

	setTimeout(() => {
		logger.log('Timeout done.')
	}, 50)

	logger.log('Launch anonymouse promise 1.')
	const x = new Promise((r, e) => {
		dumbSleep(1000, true)
		logger.log('resolve 1')
		r(1)
	}).then((r) => {
		dumbSleep(1000, true)
		logger.log(`Anonymouse promise resolved to '${r}'.`)
	})

	// dumbSleep(500, true)

	logger.log('Launch anonymouse promise 2.')
	const y = new Promise((r, e) => {
		dumbSleep(1000, true)
		logger.log('resolve 2')
		r(2)
	}).then((r) => {
		dumbSleep(1000, true)
		logger.log(`Anonymouse promise resolved to '${r}'.`)
	})

	logger.log('Script completed.')
}

export default Loopy
