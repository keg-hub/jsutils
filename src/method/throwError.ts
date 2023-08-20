/** @module Function */

import { isStr } from '@string/isStr'

/**
 * Throws an Error from the passed in error
 * @function
 * @throws Error
 * @param {Object|string} error - The Error message or Object to throw
 *
 */
export const throwError = (error: string | Error) => {
  if (isStr(error)) throw new Error(error as string)

  throw error
}
