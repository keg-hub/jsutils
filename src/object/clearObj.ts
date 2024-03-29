/** @module Object */

/**
 * Removes all properties from an object.
 * @function
 * @param {Object} obj - object to remove properties from
 * @param {Array} [filter] - list of keys to not remove
 * @returns {void}
 */
export const clearObj = (obj: Record<any, any>, filter?: string[]): void => {
  obj &&
    Object.entries(obj).map(([key, value]) => {
      if (filter && filter.indexOf(key) !== -1) return
      if (typeof value === 'object') clearObj(value)
      obj[key] = undefined
      delete obj[key]
    })
}
