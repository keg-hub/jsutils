/** @module String */

import { removeDot } from './removeDot'

/**
 * Converts `-` and `_` to white space and calls remove removeDot, to remove a period.
 * @function
 * @param {String} string to be converted
 * @return {String} - cleaned string
 */
export const cleanStr = str => {
  return (str && removeDot(str).replace(/[-_]/gm, ' ')) || str
}
