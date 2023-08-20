/** @module String */

import { isStr } from './isStr'

/**
 * Converts a string to train case, I.E. marginTop => margin-top.
 * @function
 * @param {String} string to be converted
 * @return {String} - string in train case format
 */
export const trainCase = <T extends string = string>(str: string): T =>
  ((isStr(str) &&
    str
      .split(/(?=[A-Z])|[\s_-]/gm)
      .join('-')
      .toLowerCase()) as T) || (str as T)
