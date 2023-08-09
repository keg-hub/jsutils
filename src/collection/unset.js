/** @module Collection */

import { updateColl } from './updateColl'

/**
 * Removes a path from an object.
 * @example
 * unset(obj, 'foo.bar')
 * // Returns the passed in obj, with the value of bar set to undefined
 * @function
 * @param {Object} obj - Object to have the attribute removed
 * @param {String|Array} path - Path of attribute to be removed, separated by string
 *
 * @return {Object} - The passed in object, with the attribute found at the path removed
 */
export const unset = (obj, path) => {
  updateColl(obj, path, 'unset')

  return obj
}

