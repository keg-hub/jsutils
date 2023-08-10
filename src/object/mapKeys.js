/** @module Object */

import { isObj } from './isObj'
import { isFunc } from '@method/isFunc'
import { mapEntries } from './mapEntries'

/**
 * Shortcut helper for mapping just the keys of an object.
 * @function
 * @param {Object} obj - Object to have it's property keys mapped
 * @param {Function} keyMapper - Function of shape (key) => nextKey
 * @returns {Object} - The new object with each key mapped to the response of keyMapper
 */
export const mapKeys = (obj, keyMapper) => {
  if (!isObj(obj) || !isFunc(keyMapper)) return obj

  return mapEntries(obj, (key, value) => [ keyMapper(key), value ])
}
