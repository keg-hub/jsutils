/** @module Boolean */

import { toStr } from '@string/toStr'
import { isBool } from './isBool'

/**
 * Converts a value to a boolean as a string.
 * @function
 * @example
 * convertToStrBool(true)
 * // Returns 'true'
 * @param {*} val - value to convert to string boolean
 * @return {String} 'true' || 'false' based on passed in value
 */
export const convertToStrBool = val =>
  isBool(val)
    ? toStr(val)
    : !val || val === 'false' || val === '0'
        ? 'false'
        : 'true'
