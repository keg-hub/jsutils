/** @module Array */

import { findExtrema } from './findExtrema'
import { identity } from '@method/identity'
import { compareTo } from '@method/compareTo'

/**
 * Returns the minimum element in arr
 * @function
 * @param {Array<Object>} arr
 * @param {Function?} propSelector - optional property selector for choosing the property to compare with
 * @example
 * const items = [ { num: 1 }, { num: 3 } ]
 * findMax(items, item => item.num) // returns { num: 1 }
 */
export const findMin = <T=any>(arr:T[] = [] as T[], propSelector:(prop:T) => T = identity) =>
  findExtrema(arr, (x, y) => compareTo(propSelector(y), propSelector(x)))
