/** @module String */

import { isStr } from './isStr'

/**
 * Converts a passed in value to a string.
 * @function
 * @param {*} val - value to be converted
 * @return {String} - value converted into a string
 */
export const toStr = <T extends string=string>(val: any): T =>
  val === null || val === undefined
    ? '' as T
    : isStr(val)
      ? val as T
      : JSON.stringify(val) as T
