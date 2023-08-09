/** @module Array */

import { isArr } from './isArr'

/**
 * Randomly sorts an arrays items.
 * @function
 * @example
 * randomizeArr([1,2,3])
 * // Returns an array randomly sorted
 * @param {Array} arr - array to randomly sorted
 * @return {Array} - randomly sorted array
 */
export const randomizeArr = arr =>
  (!isArr(arr) && arr) || arr.sort(() => 0.5 - Math.random())
