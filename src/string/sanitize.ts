/** @module String */

import { isStr } from './isStr'

/**
 * Sanitize a string of HTML content.
 * @function
 * @param {String} string
 * @return {String} - cleaned string
 */
export const sanitize = <T extends string=string>(str: string): T =>
  (isStr(str) &&
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') as T) ||
  str as T
