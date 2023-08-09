/** @module String */

import { isStr } from './isStr'
import { mapString } from './mapString'
import { isLowerCase } from './isLowerCase'
import { isUpperCase } from './isUpperCase'

/**
 * Converts a string into a delimted script based on the passed in arguments
 * @function
 * @param {String} str - string of any casing
 * @param {String} delimiter - How the string should be split e.g. '_'
 * @param {Array<string>} [delimiters] - An array of delimiter characters on which this function searches and breaks.<br/>Defaults to checking -, _, and space
 * @returns {String} - A new string with the specified delimiter delimiting each word
 *
 * @example
 * delimitString('fooBar', '_') === 'foo_Bar'
 */
export const delimitString = (str, delimiter, delimiters = [ '-', '_', ' ' ]) => {
  if (!isStr(str)) return str
  const isDelimiter = c => delimiters.some(del => del === c)
  let prevChar = '_'
  return mapString(str, char => {
    if (isDelimiter(char)) {
      prevChar = delimiter
      return delimiter
    }

    if (isUpperCase(char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
      prevChar = char
      return delimiter + char
    }

    prevChar = char
    return char
  })
}
