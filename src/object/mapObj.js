/** @module Object */

import { isFunc } from '@method/isFunc'
import { isObj } from './isObj'

/**
 * Map over and objects props and values.
 * @function
 * @param {Object} obj - Object to map over
 * @param {Function} cb - Method to call for each entry in the passed in obj
 * @return {Array} -  returned values from callback || The entries of the passed in obj
 */
export const mapObj = (obj, cb) => {
  if (!isObj(obj)) return []

  const entries = Object.entries(obj)
  return isFunc(cb) ? entries.map(([ key, value ]) => cb(key, value)) : entries
}
