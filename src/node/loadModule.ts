/** @module Node */

import path from 'path'
import { isArr } from '@array/isArr'
import { isFunc } from '@method/isFunc'
import { isObj } from '@object/isObj'
import { isStr } from '@string/isStr'
import { ensureArr } from '@array/ensureArr'

/**
 * Gets the relative path from the passed in pathToModule
 * @param {String} pathToModule - Location to get the relative path from
 * @returns {String} - Update pathToModule string as a relative path
 */
const getRelativePath = (pathToModule: string): string => {
  const { filename } = require.main
  const split = filename.split('/')
  split.pop()

  return path.resolve(split.join('/'), pathToModule)
}

/**
 * Use nodes require method to load a module by file path.
 * <br/>Use the rootDir to load the module if it's passed in
 * <br/>If rootDir + pathToModule fails, will try to load the module without the rootDir
 * @param {String} pathToModule - Path to the module to load
 * @param {Object} config - settings to load the module
 * @param {String} config.rootDir - root directory to load the module from
 * @param {Boolean} config.logErrors - should require errors be logged
 *
 * @returns {Object|Function} - Loaded module
 */
const requireModule = (
  pathToModule: string,
  config: Record<string, any> = {}
) => {
  const { rootDir, logErrors } = config
  try {
    // Check if a rootDir exists
    // If rootDir exists, use it to load the module
    // If no rootDir, try to load the module without it
    return rootDir
      ? require(path.join(rootDir, pathToModule))
      : require(getRelativePath(pathToModule))
  }
  catch (err) {
    // Show errors if set to true
    logErrors && console.error(err.message)

    // If there's and error, call requireModule again, without the rootDir
    return rootDir ? requireModule(pathToModule, null) : undefined
  }
}

/**
 * Checks if the module is a function and calls it
 * <br/>Or if it's an object return it
 * @param {Object|Array|Function} foundModule - module loaded from require
 * @param {any} params - arguments to pass to the module if it's a function
 *
 * @returns {any} - Loaded modules or undefined
 */
const loadByType = (foundModule: any, params: any[]) => {
  // Check the type of the foundModule
  // If it's a function call it with params
  // If it's an object just return it
  // If it's not a function or object, return undefined
  return isFunc(foundModule)
    ? foundModule(...params)
    : isObj(foundModule) || isArr(foundModule)
      ? foundModule
      : undefined
}

/**
 * Loops through the pathsToModule array trying to require them
 * @param {Array} pathsToModule - Potential paths to a module
 * @param {Object} config - settings to load the module
 * @param {String} config.rootDir - root directory to load the module from
 * @param {Boolean} config.logErrors - should require errors be logged
 * @param {Array} params - Arguments to pass the the module when called if it's a function
 *
 * @returns {Object} - Loaded module object
 */
const loopLoad = (
  pathsToModule: string[],
  config: Record<string, any> = {},
  params: any[]
) => {
  try {
    const modulePath = pathsToModule.shift()
    const foundModule = requireModule(modulePath, config)
    const loadedModule = foundModule && loadByType(foundModule, params)

    if (!loadedModule) throw new Error(`No Module!`)

    return loadedModule
  }
  catch (err) {
    if (!isArr(pathsToModule) || !pathsToModule.length) return undefined

    return loopLoad(pathsToModule, config, params)
  }
}

/**
 * Use nodes require method to load a module by file path.
 * <br/>If the path does not exist check the altPaths to see if any of those paths exist
 * <br/>If it's a function call it and pass in the params array
 * <br/>Module path is relative to the caller, NOT this function file location!
 * @function
 * @example
 * const packageConfig = loadModule('../package.json')
 * @example
 * const packageConfig = loadModule([ './package.json', '../package.json', '../../package.json', ])
 * @example
 * const packageConfig = loadModule([ './package.json' ], { rootDir: 'path to root directory' })
 * @example
 * const packageConfig = loadModule([ './functionModule' ], {}, param1, param2, param2)
 * // Module will be called if it's a function, and param1, param2, param2 will be passed in
 * @param {Array|String} pathsToModule - Potential paths to a module
 * @param {Object} [config] - settings to load the module
 * @param {String} [config.rootDir] - root directory to load the module from
 * @param {Boolean} [config.logErrors] - should require errors be logged
 * @param {...Array|undefined} params - Arguments to pass the the module when called if it's a function
 *
 * @returns {Object} - Loaded module object
 */
export const loadModule = (
  pathsToModule: string | string[],
  config: Record<string, any> = {},
  ...params: any[]
) => {
  // Check if there are paths to load
  // Call loopLoad to load the module
  // If not paths, log an error
  return isStr(pathsToModule) || isArr(pathsToModule)
    ? loopLoad(ensureArr<string>(pathsToModule), config, params)
    : console.error(
        `loadModule requires a string or an array of strings as the first argument.`
      )
}
