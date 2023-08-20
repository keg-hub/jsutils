/** @module Array */

import { isArr } from './isArr'
import { isObj } from '@object/isObj'

/**
 * Creates a copy of the passed in array.
 * <br/>Returns empty array, if param is not an array.
 * @function
 * @example
 * cloneArr([1,2,3])
 * // Returns copy of the passed on array
 * @param {Array} arr - array to be copied
 * @return {Array} - copy of passed in array
 */
export const cloneArr = <T=any>(arr: T[]): T[] =>
  Array.from([
    // If arr is not an array or object, just use empty array, so we don't throw!
    ...((isArr(arr) && arr) || (isObj(arr) && Object.entries(arr)) || []),
  ]) as T[]
