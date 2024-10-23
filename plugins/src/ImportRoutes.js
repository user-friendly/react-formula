/**
 * Import Routes plugin.
 */

import fs from 'fs'
import { default as fsPath } from 'node:path'
import { opendirSync, readdirSync } from 'node:fs'
import { normalizePath, createLogger, transformWithEsbuild } from 'vite'
import { createFilter} from '@rollup/pluginutils'

// FIXME Prefix with: rollup-plugin-
// TODO https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention

const virtualImportName = 'RouterPathMap'
const virtualImportNameID = '\0' + virtualImportName

let logger = createLogger('error', {prefix: '[ImportRoutes]', allowClearScreen: false})

const ListFilesRec = (baseDir) => {
	let dir = null
	const list = []
	const queue = [baseDir]
	
	for (let path = queue.shift(); path; path = queue.shift()) {
		dir = opendirSync(path)
		
		for (let dirent = dir.readSync(); dirent; dirent = dir.readSync()) {
			if (dirent.isFile()) {
				list.push(fsPath.join(path, dirent.name))
			}
			else if (dirent.isDirectory()) {
				queue.push(fsPath.join(path, dirent.name))
			}
		}
		dir.close()
	}
	
	return list
}

// Grab comment blocks.
const regCommentBlock = /\/\/.*?$|\/\*[\s\S]*?\*\//gm
const regSourceProperty = /\%([a-zA-Z_$][\w$]+)\s*=\s*([^;\n]+)/g

/**
  * Grab properties in comment blocks.
  * 
  * Properties have the following format:
  * %[variable name] = [value]
  * 
  * The '%' is literal and signifies a source file property.
  * Variable names have the same naming rules as JavaScript variables.
  * The value is taken as a string till the end of the line or ';'.
  * Whitespace is trimmed off each ends.
  * 
  * Example:
  * 
  * %title = About
  * %route = /about
  * %weight = 2
  */
function extractSourceProperties(source) {
	let matches = source.match(regCommentBlock)
	if (matches) {
	  matches = Array.from(matches.join("\n").matchAll(regSourceProperty), m => [m[1].trim(), m[2].trim()])
	  if (matches) {
		return Object.fromEntries(matches)
	  }
	}
	return {}
}

const ImportRoutes = () => {
  let config = {}
  
  let baseDir = false
  
  let filterRoute = false
  let filter = false

  let importsSrc = []
  let componetsSrc = []
  
  const regenerateImportsSrc = () => {
	logger.info('Regenerate route imports.', {timestamp: true})
	
	let imports = readdirSync(baseDir, {recursive: true}).map(f => {return fsPath.join(baseDir, f)})
	//console.log('imports 1st pass: ', imports)
	// Just wanted to practice an algo. Also, filtering can be done inside this
	// function to avoid going down massive subdirs (usually /node_module/).
	//imports = ListFilesRec(baseDir)
	imports = imports.filter(f => {return filterRoute(f)})
	//console.log('imports 2nd pass: ', imports)
	
	if (!imports.length) {
		return
	}
	
	importsSrc = []
	componetsSrc = []
	
	// TODO This seems a bit hacky.
	let sid = 1000
	let importName = ''
	let props = {}
	imports.forEach(path => {
		props = extractSourceProperties(fs.readFileSync(path, 'utf-8'))
		
		// No routing without a route.
		if (props.route === undefined) {
			return;
		}
		props.title = props.title !== undefined ? props.title : 'Unknown'
		
		importName = `Route${sid++}`
		importsSrc.push(`const ${importName} = lazy(() => import('${path}'))`)
		componetsSrc.push(`<Route path="${props.route}" element={<${importName} />} />`)

		logger.info(`Add route '${props.route}' for component '${path}'.`, {timestamp: true})
	})
  }
  
  // Source template.
  const getSource = () => {
	return `
//
// Dynamically generated routes.
//

import {default as React, lazy} from 'react'

import {Routes, Route} from 'react-router-dom'

${importsSrc.join("\n")}

export default function ${virtualImportName} ({index, notfound}) {
	return <Routes>
		${componetsSrc.join("\n")}
		
		<Route path="/" element={index} />
		<Route path="/home" element={index} />
		<Route path="*" element={notfound} />
	</Routes>
}`
  }
  
  return {
    name: 'import-routes',
	enforce: 'pre',
	
	configResolved(resolvedConfig) {
		config = resolvedConfig
		// Set appropriate log level.
		logger = createLogger(config.logLevel, {prefix: '[ImportRoutes]', allowClearScreen: false})
		
		// Get the base dir from config
		baseDir = config.importRoutes.root ? config.importRoutes.root : config.root
		// It's easier to work with absolute paths. But is it secure?
		if (!fsPath.isAbsolute(baseDir)) {
			baseDir = fsPath.join(config.root, baseDir)
		}
		
		// Filter for route files to gather.
		filterRoute = createFilter(config.importRoutes.includeRoute, config.importRoutes.excludeRoute)
		// Filter for to expand the routes in.
		filter = createFilter(config.importRoutes.include, config.importRoutes.exclude)
	},
	
	buildStart() {
		regenerateImportsSrc()
	},
	
	watchChange(id, change) {
		if (filterRoute(id) && (change.event === 'create' || change.event === 'delete')) {
			logger.info(`Route change detected: ${id}, ${change.event}`, {timestamp: true})
			regenerateImportsSrc()
		}
	},
	
	resolveId(id) {
		if (id === virtualImportName) {
			return virtualImportNameID
		}
	},
	
	async load(id) {
		if (id === virtualImportNameID) {
			logger.info(`Expand router imports in '${id}`, {timestamp: true})
			return await transformWithEsbuild(getSource(), id, {
				loader: 'jsx',
				jsx: 'automatic',
			})
		}
	},
  }
}

export default ImportRoutes
