
/** @module String */

/**
 * Removes quotes from a string
 * @function
 * @param {String} str - string to convert
 * @return {String} string without quotes
 */
export const removeQuotes = (str:string) => (
  str
    .trim()
    .replace(/^("|')/, '')
    .replace(/("|')$/, '')
)