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
export const intersect = <T=any, M=any[], N=any[]>(arrA: M, arrB:N):T[] => {
  if (!isArr(arrA) || !isArr(arrB)) return []

  const setB = new Set(arrB as any[])
  return [...new Set(arrA as any[])].filter(x => setB.has(x)) as T[]
}
