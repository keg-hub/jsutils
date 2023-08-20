/** @module String */

import { isStr } from './isStr'
import { isArr } from '@array/isArr'

/**
 * Joins strings and array of string together with spaces
 * @function
 * @param {String} original - The default string that other strings get added to
 * @param {string|Array} toAdd - String of Array of Strings to add to the original
 *
 * @returns {String} Joined strings seperated by space
 */
export const spaceJoin = <T extends string=string>(original: string, toAdd: string | string[]): T => {
  toAdd = isArr(toAdd) ? toAdd : [toAdd]
  return toAdd.reduce(
    (joined, item) => {
      return isStr(item)
        ? `${joined ? joined + ' ' : ''}${item}`.trim()
        : joined
    },
    isStr(original) ? original : ''
  ) as T
}
