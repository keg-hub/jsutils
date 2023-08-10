/** @module Function */

import { isStr } from '@string/isStr'
import { isObj } from '@object/isObj'
import { isEmpty } from '@ext/isEmpty'

/**
 * Extracts the message from the exception, whether string or object
 * @function
 * @param {*} exception - Error to be extracted
 * @return {string?} - The message or null if no message is present
 * @example
 * try {
 *   throwSomeException()
 * }
 * catch (err) {
 *   const message = parseErrorMessage(err) || 'Error'
 * }
 */
export const parseErrorMessage = exception => {
  return isStr(exception) && !isEmpty(exception)
    ? exception
    : isObj(exception)
    ? exception.message
    : null
}
