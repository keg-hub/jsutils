/** @module String */

import { isStr } from './isStr'

/**
 * Sanitize a string of HTML content.
 * @function
 * @param {String} string
 * @return {String} - cleaned string
 */
export const sanitize = str =>
  (isStr(str) &&
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')) ||
  str
