/** @module String */

import { toStr } from './toStr'

/**
 * Builds a string path from passed in args ( i.e. path/to/thing ).
 * @function
 * @return {String} - built path from arguments
 */
export const buildPath = <T extends string = string>(...args: any[]): T => {
  const built = args.reduce((path, arg) => {
    let str = toStr(arg)

    return `${path}${(str && '/' + str) || ''}`
  }, '')

  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/')
}
