export default {
	input: 'src/index.js',
	output: {
		file: 'dist/bundle.js',
		format: 'es', // Change this to 'esm', 'iife', 'umd', etc., depending on your use case
	},
	watch: {
		// All dependencies are watched by default.
		// The patterns in 'include' are additions.
		// include: './src/**',
		clearScreen: false,
		buildDelay: 500,
	},
	plugins: [
		// Add necessary plugins like node-resolve, commonjs, etc.
	],
}
