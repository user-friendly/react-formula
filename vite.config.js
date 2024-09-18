/**
 * Vite config file.
 */

// Framework plugins.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project plugins.
import ImportRoutes from './plugins/src/ImportRoutes.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
	ImportRoutes(),
	react()
  ],
  server: {
	port: 3000
  },
  clearScreen: false,
  build: {
	outDir: 'build/',
	manifest: 'manifest.json'
  },
  importRoutes: {
	// The base dir where all the routes are.
	// Optional. Will default to project root. Set to source directory to improve performance.
	root: 'src/Page',
	
	// These filters are passed to @rollup/pluginutils/createFilter().
	includeRoute: /src\/Page\/.*\.jsx$/,
	excludeRoute: [
		'/node_modules/',
		// Ignore page components.
		'**/Components/**'
	],
	
	/* TODO Not used, in favor of virtual/dynamic imports.
	// File(s) the routers will be imported in.
	// These filters are passed to @rollup/pluginutils/createFilter().
	include: 'src/RouterPreloader.jsx',
	exclude: '/node_modules/'
	*/
  }
})
