/** @module Collection */

import { exists } from '@ext/exists'
import { isArr } from '@array/isArr'
import { isStr } from '@string/isStr'

/**
 * Searches an object based on the path param
 * <br/>I.E. path = 'data.foo.bar' => will return obj.data.foo.bar.
 * <br/>If bar does not exist, then will return obj.data.foo
 * @example
 * get(obj, 'data.foo.bar')
 * // Returns the value of bar
 * @example
 * get(obj, ['data', 'foo', 'bar'])
 * // Returns the value of bar
 * @function
 * @param {Object} obj - Will search the object based on the path
 * @param {String|Array<string>} path - Dot notation string or Array of string keys of the object
 * @param {*} [fallback] - Separated string to search the object
 * @return {*} - The final value found from the path
 */
export const get =<T=any>(obj: Record<any, any>|any[], path: string | string[], fallback?: T): T => {
  const isPathArr = isArr(path)
  if (!isStr(path) && !isPathArr) return exists(fallback) ? fallback : undefined

  const parts = isPathArr ? path : path.split('.')

  const result = parts.reduce((obj, prop) => {
    const type = typeof obj
    if (!exists(obj) || (type !== 'object' && type !== 'function'))
      return undefined

    prop = prop.startsWith('[') ? prop.replace(/\D/g, '') : prop
    return obj[prop]
  }, obj)

  return exists(result) ? result : fallback
}
