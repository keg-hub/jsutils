/** @module Dom */

/**
 * Checks if there is access to the dom
 * @function
 * @example
 * // In Browser
 * hasDomAccess() === true
 * // In Node
 * hasDomAccess() === false
 * @return {Boolean} True if executed in a browser
 */
export const hasDomAccess = (): boolean => {
  try {
    return !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  }
  catch (error) {
    return false
  }
}
