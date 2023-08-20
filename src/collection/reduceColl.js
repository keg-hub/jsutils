/** @module Collection */

import { isFunc } from '@method/isFunc'
import { isColl } from './isColl'
import { isArr } from '@array/isArr'

/**
 * Loops over collection and calls reduce.
 * @example
 * reduceColl([1, 2, 3], (key, val, coll) => { console.log(key) }, {})
 * // Returns what ever is returned from the last iteration of the reduce loop
 * @function
 * @param {Object|Array} obj - Object to loop over its keys
 * @param {Function} cb - Predicate function to call for each key of the collection
 * @param {*} [reduce] - Starting data passed to reduce method
 * @return {Object} - Last returned data from the loop
 */
export const reduceColl = (coll, cb, reduce) =>
  isFunc(cb) && isColl(coll)
    ? Object.keys(coll).reduce(
      (data, key) => cb(key, coll[key], coll, data),
      reduce
    )
    : isArr(coll)
      ? []
      : {}
