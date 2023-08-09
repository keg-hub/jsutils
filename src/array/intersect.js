/** @module Array */

import { isArr } from './isArr'

/**
 * Creates and returns a new array of all items that exist in both passed in arrays
 * @param {Array<any>} arrA - array to compare with arrB
 * @param {Array<any>} arrB - array to compare with arrA
 *
 * @example
 *  intersect([1], [1]) === [1]
 *
 * @returns {Array<any>} - Array of matching items
 */
export const intersect = (arrA, arrB) => {
  if(!isArr(arrA) || !isArr(arrB)) return []
  
  const setB = new Set(arrB)
  return [...new Set(arrA)].filter((x) => setB.has(x))
}
