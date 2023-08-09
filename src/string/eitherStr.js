/** @module String */

import { isStr } from './isStr'

/**
 * Checks if the first param is a string, and returns it.
 * <br/>If it's not a string, the second param is returned
 * @function
 * @param {String} str1 - return if is string
 * @param {String} str2 - use if first is not a string
 * @returns {String}
 */
export const eitherStr = (str1, str2) => (isStr(str1) && str1) || str2
