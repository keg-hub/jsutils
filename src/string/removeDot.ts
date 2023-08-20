/** @module String */

/**
 * Removes a `.` from the start and end of a string.
 * @function
 * @param {String} str - string to convert
 * @return {String} - string without the `.`
 */
export const removeDot = <T extends string=string>(str: string): T => {
  const noDot = str.indexOf('.') === 0 ? str.slice(1) : str as T
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) as T : noDot as T
}
