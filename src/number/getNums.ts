/** @module Number */

import { toStr } from '@string/toStr'

/**
 * Gets numbers and floats (.) from a string.
 * @example
 * getNums('$1.23')
 * // Returns '1.23'
 * @function
 * @param {*} val - value to pull numbers from
 * @return {String} Numbers found in value
 */
export const getNums = (val: any): string => toStr(val).replace(/([^.\d])/gm, '')
