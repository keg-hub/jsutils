/** @module Number */

import { isNum } from './isNum'

/**
 * Checks if a number is a Float.
 * @example
 * isFloat(1.23)
 * // Returns true
 * @example
 * isFloat('1.2')
 * // Returns false ( because it's a string )
 * @function
 * @param {Number} num - value to check
 * @return {Boolean} true or false - value is an Float
 */
export const isFloat = <T = number>(val: any): val is T =>
  isNum(val) && val % 1 !== 0
