/** @module String */

import { isStr } from './isStr'
import { toStr } from './toStr'

/**
 * Checks if a string contains another string.
 * @function
 * @param {String} string - value to be checked
 * @param {String} substring - value to search for
 * @param {Number} [fromIndex] - Index of the string to search from
 * @return {Boolean} - if the substring exists string
 */
export const containsStr =(str: string, substring: string, fromIndex?: number): boolean => {
  str = (!isStr(str) && toStr(str)) || str
  substring = (!isStr(substring) && toStr(substring)) || substring

  return str.indexOf(substring, fromIndex) !== -1
}
