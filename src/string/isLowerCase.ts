/** @module String */

/**
 * Checks if a string is all lowercase letters
 * @function
 * @param {String} str - String to check if it's lowercase
 * @returns {Boolean} - True if str is lowercase
 */
export const isLowerCase = <T extends string = string>(str: string): str is T =>
  str === str.toLowerCase()
