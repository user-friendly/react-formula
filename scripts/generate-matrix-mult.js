
import {print, println} from './printer.js'

const args = process.argv.slice(2)

println('Generate matrix multiplication OP, for numerical arrays A & B, size: ', args[0])

if (args.length < 3) {
	println('Invalid argument. Supply 3 arguments, representing matrix dimensions: m, n, p')
	process.exit(1)
}

let [m, n, p] = [parseInt(args[0]), parseInt(args[1]), parseInt(args[2])]
let len = m * p

println('m, n, p, len: ', m, n, p, len)

println('[')
for (let i = 0; i < m; i++) {
	print("\t")
	const row = []
	for (let j = 0; j < p; j++) {
		const cell = []
		for (let k = 0; k < n; k++) {
			cell.push(`A[${i*n + k}]*B[${k*p + j}]`)
		}
		row.push(`(${cell.join(' + ')})`)
	}
	println(row.join(', ') + ',')
}
println(']')
