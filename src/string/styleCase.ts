/** @module String */

import { isStr } from './isStr'
import { camelCase } from './camelCase'

/**
 * Converts a string to css in js format.
 * Useful for converting css rules into js format, I.E. margin-top => marginTop.
 * @function
 * @param {String} str - string to be converted
 * @return {String} - string in style case format
 */
export const styleCase = <T extends string=string>(str: string): T => {
  if (!isStr(str)) return str

  const cased = camelCase(str)
  return `${cased[0].toLowerCase()}${cased.slice(1)}` as T
}
