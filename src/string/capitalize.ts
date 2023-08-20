/** @module String */

import { isStr } from './isStr'

/**
 * Converts first letter of a string to be capitalized.
 * @function
 * @param {String} string
 * @param {Boolean} [lowercaseTail=true] - if true, will also lowercase the all characters except the first
 * @return {String} - Passed in string, but capitalized
 */
export const capitalize = <T extends string = string>(
  str: string,
  lowercaseTail: boolean = true
): T => {
  if (!isStr(str) || !str[0]) return str as T
  const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1)
  return `${str[0].toUpperCase()}${tail}` as T
}
