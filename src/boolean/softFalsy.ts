/** @module Boolean */

/**
 * Checks if a value is falsy, excluding empty string and 0.
 * @function
 * @example
 * softFalsy('')
 * // Returns true
 * @example
 * softFalsy(0)
 * // Returns true
 * @example
 * softFalsy(null)
 * // Returns false
 * @param {*} val - value to check
 * @return {Boolean} - True if val is truthy, an empty string or 0
 */
export const softFalsy = val => Boolean(val || val === '' || val === 0)
