/** @module Function */

/**
 * Check if the passed in item is a function.
 * @example
 * isFunc(() => {})
 * // Returns true
 * @example
 * isFunc('bar')
 * // Returns false
 * @function
 * @param {*} test
 * @return {Boolean} is a function
 */
export const isFunc = <T = (...args: any[]) => any>(func: any): func is T =>
  typeof func === 'function'
