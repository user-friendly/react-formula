import {inspect} from 'util'

let print = (...args) => {
	for (let i = 0; i < args.length; i++) {
		if (typeof args[i] !== 'string') {
			args[i] = inspect(args[i], { depth: null, colors: true })
		}
	}
	process.stdout.write(args.join(' '))
}

let println = (...args) => {
	print(...args, "\n")
}

const testPrinter = () => {
	println("This is a regular string",
		{a: 1, b: 'abcd'}, [1, 2, 3, {x: 1, y: 2}], Number(12), null, NaN, Infinity, true, false, undefined)
}

export {print, println}
