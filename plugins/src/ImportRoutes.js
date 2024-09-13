/**
 * Import Routes plugin.
 */

import { default as fsPath } from 'node:path'
import { opendirSync, readdirSync } from 'node:fs'
import { normalizePath, createLogger } from 'vite'
import { createFilter} from '@rollup/pluginutils'

// FIXME Prefix with: rollup-plugin-
// TODO https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention

const virtualImportName = 'RouterPreloader'
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

const ImportRoutes = () => {
  // Config 
  let config = {}
  let baseDir = false
  let filterRoute = false
  let filter = false
  let imports = []
  let importsSrc = ''
  
  const regenerateImportsSrc = () => {
	logger.info('Regenerate route imports.', {timestamp: true})
	
	imports = readdirSync(baseDir, {recursive: true}).map(f => {return fsPath.join(baseDir, f)})
	// Just wanted to practice an algo. Also, filtering can be done inside this
	// function to avoid going down massive subdirs (usually /node_module/).
	//imports = ListFilesRec(baseDir)
	imports = imports.filter(f => {return filterRoute(f)})
	
	// TODO This seems a bit hacky.
	let sid = 1000
	let { importName, importPath } = ['', '']
	importsSrc = ''
	imports.forEach(i => {
		sid++
		importName = `Route${sid}`
		importsSrc += `import { default as ${importName} } from '${i}'\n`;
		logger.info(`Import '${i}' as ${importName}.`, {timestamp: true})
	})
  }
  
  return {
    name: 'import-routes',
	enforce: 'pre',
	
	// TODO Provide defaults.
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
	
	load(id) {
		if (id === virtualImportNameID) {
			logger.info(`Expand router imports in '${id}`, {timestamp: true});
			return `${importsSrc}; export default function RouterPreloader() {}`
		}
	},
	
 /*   transform(src, id) {
      if (filter(id)) {
		logger.info(`Expand route imports in '${id}'`, {timestamp: true})
		
		src = src.replace('import * from RouterPreloader', importsSrc)
        return {
          code: src,
          map: null, // provide source map if available
        }
      }
    },*/
  }
}

export default ImportRoutes
