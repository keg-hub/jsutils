/** @module Number */

import { equalsNaN } from './equalsNaN'
import { isNum } from './isNum'
import { getNums } from './getNums'

/**
 * Converts passed in value to a float.
 * @example
 * toFloat('1.34')
 * // Returns 1.34
 * @example
 * toFloat(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {Number} value converted to an float
 */
export const toFloat = val =>
  (val && !equalsNaN(val) && parseFloat((isNum(val) && val) || getNums(val))) ||
  0
