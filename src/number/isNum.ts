/** @module Number */

import { equalsNaN } from './equalsNaN'

/**
 * Checks is value is a number.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt(NaN)
 * // Returns false
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {*} val - value to check if is a number
 * @return {Boolean} T/F - if value is a number
 */
export const isNum = val => typeof val === 'number' && !equalsNaN(val)
