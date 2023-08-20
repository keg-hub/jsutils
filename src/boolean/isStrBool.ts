/** @module Boolean */

/**
 * Checks is value is a boolean as a string.
 * @function
 * @example
 * isStrBool("true")
 * // Returns true
 * @example
 * isStrBool(true)
 * // Returns false
 * @param {*} val - value to check if boolean as a string
 * @return {Boolean} True if val is a string boolean
 */
export const isStrBool = <T = string>(val: any): val is T =>
  val === 'false' || val === 'true'
