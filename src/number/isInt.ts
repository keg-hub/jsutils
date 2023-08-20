/** @module Number */

import { isNum } from './isNum'

/**
 * Checks if a number is an integer.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {Number} num - value to check
 * @return {Boolean} true or false - value is an Int
 */
export const isInt = <T=number>(val: any): val is T => isNum(val) && val % 1 === 0
