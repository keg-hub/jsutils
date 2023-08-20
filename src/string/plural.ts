/** @module String */

/**
 * Adds an `s` to the end of a string, if one does not exist.
 * @function
 * @param {String} str - string to convert
 * @return {String} string as a plural
 */
export const plural = <T extends string=string>(str: string): T => {
  if (!str || !str.length) return str as T
  return str[str.length - 1] !== 's' ? str + 's' as T : str as T
}
