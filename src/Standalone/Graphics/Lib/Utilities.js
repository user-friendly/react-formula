
function FormatTotalTime(ms) {
	ms = Math.abs(parseInt(ms))
	const hours = Math.floor(ms / 3600000);
	const minutes = Math.floor((ms % 3600000) / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	const milliseconds = ms % 1000;
	
	// Time in ms.
	// ms = 1
	// sec = 1000 ms
	// min = 60 * sec
	// hour = 60 * min * sec
	// day = 24 * hour * min * sec
	
	return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}

class Average {
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

export {FormatTotalTime, Average}
