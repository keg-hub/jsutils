/** @module Function */

import { isStr } from '@string/isStr'
import { isBool } from '@boolean/isBool'
import { isNum } from '@number/isNum'

/**
 * Checks if param is an orderable primitive
 * @function
 * @param {*} x
 * @returns {bool} - true if x is a comparable primitive
 */
export const isOrderable = (x: any): boolean =>
  isStr(x) || isNum(x) || isBool(x)
