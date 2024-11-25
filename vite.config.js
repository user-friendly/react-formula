/**
 * Vite config file.
 */

// Framework plugins.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { compression } from 'vite-plugin-compression2'

// Project plugins.
import ImportRoutes from './plugins/src/ImportRoutes.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
	ImportRoutes(),
	react(),
	compression(),
  ],
  server: {
	port: 3000
  },
  clearScreen: false,
  build: {
	manifest: 'manifest.json',
	reportCompressedSize: false,
	rollupOptions: {
		output: {
			manualChunks: {
				services: ['lodash', 'msw', 'clsx', 'tailwind-merge'],
			}
		}
	}
  },
  importRoutes: {
	// The base dir where all the routes are.
	// Optional. Will default to project root. Set to source directory to improve performance.
	root: 'src/Page',
	
	// These filters are passed to @rollup/pluginutils/createFilter().
	includeRoute: /src\/Page\/.*\.jsx$/,
	excludeRoute: [
		'**/src/Page/Template.jsx',
		'**/src/Page/Lesson/LessonTemplate.jsx',
		'**/node_modules/**',
		// Ignore page components.
		'**/Components/**',
	],
	
	/* TODO Not used, in favor of virtual/dynamic imports.
	// File(s) the routers will be imported in.
	// These filters are passed to @rollup/pluginutils/createFilter().
	include: 'src/RouterPreloader.jsx',
	exclude: '/node_modules/'
	*/
  }
})
