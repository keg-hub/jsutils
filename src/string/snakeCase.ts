/** @module String */

import { delimitString } from './delimitString'

/**
 * Converts a string to snake_case.
 * @function
 * @param {String} str - String to be converted
 * @example
 * snakeCase('fooBar') === 'foo_bar'
 * @returns {String} - The string in snake_case, or the input if it is not a string
 */
export const snakeCase = str => {
  const underscored = delimitString(str, '_')
  return underscored.toLowerCase()
}
