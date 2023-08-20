/** @module String */

/**
 * Check if passed in value is a string.
 * @function
 * @param {*} str - param to check if type is a string
 * @return {Boolean} - True if it's a string
 */
export const isStr = <T extends string = string>(str: any): str is T =>
  typeof str === 'string'
