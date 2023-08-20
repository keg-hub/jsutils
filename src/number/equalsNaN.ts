/** @module Number */

/**
 * Checks if a value is NaN.
 * @example
 * equalsNaN(NaN)
 * // Returns true
 * @example
 * equalsNaN(1)
 * // Returns false
 * @example
 * equalsNaN('')
 * // Returns false
 * @function
 * @param {Number} val - value to check if is NaN
 * @return {Boolean} T/F - if value is a number
 */
export const equalsNaN = (val: number): boolean => typeof val === 'number' && val != val
