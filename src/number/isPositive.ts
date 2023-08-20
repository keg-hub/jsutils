/** @module Number */

import { isNum } from './isNum'

/**
 * @function
 * @param {*} x
 * @returns { boolean } true if x is a positive number
 * @example isPositive(0) // false
 * @example isPositive(1) // true
 */
export const isPositive = <T=number>(val: any): val is T => isNum(val) && val > 0
