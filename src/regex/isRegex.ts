/** @module RegEx */

/**
 * Checks if value is an instance of regex
 * @function
 * @param {*} val
 * @return {Boolean} true if val is an instance of RegExp
 * @example
 * isRegex(new RegExp('a')) // true
 * isRegex(/a/) // true
 * isRegex('a') // false
 */
export const isRegex = (val: any): val is RegExp =>
  Boolean(val && val instanceof RegExp)
