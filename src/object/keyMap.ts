/** @module Object */

import { isStr } from '@string/isStr'
import { isArr } from '@array/isArr'

/**
 * Converts an array of strings to a matching key/value pair object.
 * @function
 * @param {Array} arr - to be converted to object
 * @param {Boolean} toUpperCase - converts the key and value to uppercase
 * @return {Object} built object
 */
export const keyMap = <T = Record<string, string>>(
  arr: string[],
  toUpperCase?: boolean
): T =>
  (isArr(arr) &&
    arr.reduce((obj, key) => {
      if (!isStr(key)) return obj

      const use = (toUpperCase && key.toUpperCase()) || key
      obj[use] = use

      return obj
    }, {} as T)) ||
  ({} as T)
