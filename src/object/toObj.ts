/** @module Object */

import { isStr } from '@string/isStr'
import { isArr } from '@array/isArr'
import { strToType } from '@ext/strToType'

/**
 * Converts an array or string into an object.
 * @function
 * @param { array | string } val - to be converted to object
 * @param {String} [divider] - if string, what divides key from value
 * @param {String} [split] - if string, what splits each key/value pair
 * @return {Object} - Converted object
 */
export const toObj = <T=Record<string, any>>(val: string[]|string, divider?: string, split?: string): T => {
  if (isArr(val))
    return Object.keys(val).reduce((obj, key) => {
      obj[key] = val[key]

      return obj
    }, {}) as T

  if (!isStr(val)) return {} as T

  divider = divider || '='
  split = split || '&'
  return val
    .toString()
    .split(split)
    .reduce((obj, item) => {
      const sep = item.split(divider)
      obj[sep[0].trim()] = strToType(sep[1].trim())

      return obj
    }, {}) as T
}
