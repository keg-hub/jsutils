/** @module Collection */

import { isFunc } from '@method/isFunc'
import { isArr } from '@array/isArr'
import { isColl } from './isColl'

/**
 * Updates a collection by removing, getting, adding to it.
 * @private
 * @function
 * @param {Object} obj - Object to update
 * @param {String|Array} path - Dot notation or Array path to the property to be updated
 * @param {String} type - Type of update to make to the obj argument
 * @param {*} val - Value to set or return based on the type argument
 * @returns {*} - Relative to the type argument
 */
export const updateColl = <T extends Record<any, any> | any[] = any>(
  obj: T,
  path: string | string[],
  type: string,
  val?: any
): undefined => {
  const org = obj
  if (!isColl(obj) || !obj || !path) return (type !== 'set' && val) || undefined

  // cloneDeep so we don't modify the reference
  const parts = isArr(path) ? Array.from(path) : path.split('.')
  const key = parts.pop()
  let prop
  let breakPath

  while ((prop = parts.shift())) {
    const next = obj[prop]

    isColl(next) || isFunc(next)
      ? (obj = next as any)
      : (() => {
          if (type === 'set') obj[prop] = {}
          else breakPath = true
          obj = obj[prop]
        })()

    if (breakPath) return val
  }

  return type === 'get'
    ? // Get return the value
      key in obj
      ? obj[key]
      : val
    : type === 'unset'
    ? // Unset, return if the key was removed
      delete obj[key]
    : // Set, updated object
      ((obj[key] = val) && org) || org
}
