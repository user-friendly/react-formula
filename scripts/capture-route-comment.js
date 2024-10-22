/**
 * Just a fun script to test parsing comments for route annotations.
 */

import _ from 'lodash'

let input = ''

process.stdin.on('data', chunk => {
  input += chunk
})

process.stdin.on('end', () => {
	streamDone()
})

process.stdin.on('error', err => {
  console.error('Error reading stdin:', err)
})

const regCommentBlock = /\/\/.*?$|\/\*[\s\S]*?\*\//gm
const regSourceProperty = /\%([a-zA-Z_$][\w$]+)\s*=\s*([^;\n]+)/g

function streamDone() {
	let matches = input.match(regCommentBlock)
	if (matches) {
	  matches = Array.from(matches.join("\n").matchAll(regSourceProperty), m => [m[1].trim(), m[2].trim()])
	  if (matches) {
	  	console.log("All properties:", matches)
		const props = _.fromPairs(matches)
		console.log("Deduped properties:", props)
	  } else {
		console.log("No routes found.")
	  }
	} else {
	  console.log("No comments found.")
	}
}
