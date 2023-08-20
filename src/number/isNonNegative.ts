/** @module Number */

import { isNum } from './isNum'

/**
 * Checks if val is a non-negative number
 * @param {*} val - To be checked it it's a non-negative number
 * @example
 *  isNonNegative(0) // true
 *  isNonNegative(1) // true
 *  isNonNegative(-1) // false
 * @function
 * @returns {Boolean} - True if val is non negative number
 */
export const isNonNegative = val => isNum(val) && val >= 0
