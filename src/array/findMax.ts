/** @module Array */

import { findExtrema } from './findExtrema'
import { identity } from '@method/identity'
import { compareTo } from '@method/compareTo'

/**
 * Returns the maximum element in arr
 * @function
 * @param {Array<Object>} arr
 * @param {Function?} propSelector - optional property selector for choosing the property to compare with
 * @example
 * const items = [ { num: 1 }, { num: 3 } ]
 * findMax(items, item => item.num) // returns { num: 3 }
 */
export const findMax = <T=any>(arr:T[] = [] as T[], propSelector:(prop:T) => T = identity) =>
  findExtrema(arr, (x, y) => compareTo(propSelector(x), propSelector(y)))
