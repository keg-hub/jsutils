/** @module String */

/**
 * Removes quotes from a string
 * @function
 * @param {String} str - string to convert
 * @return {String} string without quotes
 */
export const removeQuotes = <T extends string = string>(str: string): T =>
  str
    .trim()
    .replace(/^("|')/, '')
    .replace(/("|')$/, '') as T
