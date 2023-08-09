/** @module Collection */

/**
 * Checks if the value is a collection ( object || array ).
 * @example
 * isColl([1,2,3])
 * // Returns true
 * @example
 * isColl({ foo: 'bar' })
 * // Returns true
 * @example
 * isColl(null)
 * // Returns false
 * @function
 * @param {*} val - Value to check
 * @return {Boolean} True if the value is a collection (Object || Array)
 */
export const isColl = val => typeof val === 'object' && val !== null
