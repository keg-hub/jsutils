/** @module Object */

import { isFunc } from '@method/isFunc'
import { isObj } from './isObj'
import { reduceObj } from './reduceObj'

/**
 * Returns a new object, consisting of every key-value pair from obj that, when passed into the predicate, returned true
 * @function
 * @param {Object} obj - Object that should have it's properties filtered
 * @param {Function} predicate  - function of form: (key, value) => Boolean
 * @param {Boolean} [logError=true] - Boolean indicating if errors should be logged
 * @returns {Object} - Object consisting of a subset of the entries from obj
 * @example: filterObj({a: 2, b: 3}, (k, v) => (v > 2)) returns: {b: 3}
 */
export const filterObj = (obj, predicate, logError = true) => {
  if (!isObj(obj)) {
    logError && console.error(`First argument ${obj} must be an object.`)
    return obj
  }

  if (!isFunc(predicate)) {
    logError && console.error(`Second argument ${predicate}, must a function`)
    return obj
  }

  return reduceObj(
    obj,
    (key, value, data) => {
      if (predicate(key, value)) data[key] = value
      return data
    },
    {}
  )
}
