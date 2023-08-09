/** @module Function */

const { isStr } = require('../string')

/**
 * Throws an Error from the passed in error
 * @function
 * @throws Error
 * @param {Object|string} error - The Error message or Object to throw
 *
 */
export const throwError = error => {
  if (!isStr(error) && error && error.stack && error.message) throw error

  throw new Error(error)
}
