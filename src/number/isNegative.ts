/** @module Number */

import { isNum } from './isNum'

/**
 * @function
 * @param {*} x
 * @returns { boolean } true if x is a negative number
 * @example isNegative(-1) // true
 * @example isNegative(0) // false
 */
export const isNegative = <T=number>(val: any): val is T => isNum(val) && val < 0
