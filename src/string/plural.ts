/** @module String */

/**
 * Adds an `s` to the end of a string, if one does not exist.
 * @function
 * @param {String} str - string to convert
 * @return {String} string as a plural
 */
export const plural = str => {
  if (!str || !str.length) return str
  return str[str.length - 1] !== 's' ? str + 's' : str
}
