/** @module String */

/**
 * Checks if a string is all capital letters
 * @function
 * @param {String} str - String to check if it's uppercase
 * @returns {Boolean} - True if str is uppercase
 */
export const isUpperCase = <T extends string = string>(str: string): str is T =>
  str === str.toUpperCase()
