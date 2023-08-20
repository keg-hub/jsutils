/** @module Array */

import { isNonNegative } from '@number/isNonNegative'
import { validate } from '@validation/validate'
import { isArr } from './isArr'

/**
 * Returns a new array with the same elements as arr, excluding `count` elements beginning at index `startIndex`
 * @function
 * @param {Array} arr
 * @param {Number} startIndex
 * @param {Number} count
 */
export const omitRange = <T = any[]>(
  arr: any[],
  startIndex: number,
  count: number
): T[] => {
  const [inputIsValid] = validate(
    { arr, startIndex, count },
    { arr: isArr, $default: isNonNegative }
  )

  if (!inputIsValid) return arr

  const nextArr = [...arr]

  nextArr.splice(startIndex, count)

  return nextArr
}
