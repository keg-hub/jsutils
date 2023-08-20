/** @module String */

import { isFunc } from '@method/isFunc'
import { isStr } from './isStr'

/**
 * Maps a string by applying function `charMapper` to each character.
 * @function
 * @param {String} str - String to be mapped
 * @param {Function} charMapper - Function of form (character) => <some character or string>
 * @returns {String} - String with each character mapped by charMap.<br/>If str is not a string or charMapper not a function, just returns the passed in str argument
 * @example
 *  mapString("hello", c => c === 'h' ? 'x' : c) // returns 'xello'
 */
export const mapString = (
  str: string,
  charMapper: (char: string) => any
): string => {
  if (!isStr(str)) return str
  if (!isFunc(charMapper)) return str
  let result = ''
  for (const char of str) {
    result += charMapper(char)
  }
  return result
}
