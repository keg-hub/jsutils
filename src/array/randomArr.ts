/** @module Array */

import { isArr } from './isArr'

/**
 * Randomly selects values from a passed in array.
 * @function
 * @example
 * randomArr([1,2,3], 1)
 * // Returns an array with one of the values in the passed in array
 * @param {Array} arr - array to select values from
 * @param {Number} [amount] - number of values to select from the array
 * @return {Array} - randomly sorted array
 */
export const randomArr = <T = any>(arr: any[], amount?: number): T[] => {
  if (!isArr(arr)) return arr

  const useAmount = amount || 1
  const randoms = []
  for (let i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return !amount ? randoms[0] : randoms
}
