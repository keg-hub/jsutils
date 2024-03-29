/** @module Array */

import { validate } from '@validation/validate'
import { isArr } from './isArr'

/**
 * Checks if arrays are set-equal: they contain the same elements,
 * but element frequencies don't matter.
 * Does this with one pass over each array and an auxilliary set.
 * @function
 * @param {Array<*>} arr
 * @param {Array<*>} otherArr
 */
export const areSetEqual = (arr: any[], otherArr: any[]): boolean => {
  const [valid] = validate({ arr, otherArr }, { $default: isArr })
  if (!valid) return null

  if (arr === otherArr) return true

  const [longest, shortest] =
    arr.length > otherArr.length ? [arr, otherArr] : [otherArr, arr]

  const arrSet = new Set(shortest)

  for (let i = 0; i < longest.length; i++) {
    const element = longest[i]
    if (!arrSet.has(element)) return false
  }

  return true
}
