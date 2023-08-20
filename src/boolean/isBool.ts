/** @module Boolean */

/**
 * Checks is value is a boolean.
 * @function
 * @example
 * isBool([1,2,3])
 * // Returns false
 * @example
 * isBool(true)
 * // Returns true
 * @param {*} val - value to check if is a number
 * @return {Boolean} True if val is a boolean
 */
export const isBool = <T=boolean>(val: any): val is T => typeof val === 'boolean'
