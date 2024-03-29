/** @module Object */

import { isStr } from '@string/isStr'

/**
 * Trims objects string fields.
 * @function
 * @param {Object} object
 * @return {Object} - object with string fields trimmed
 */
export const trimStringFields = <T = Record<string, any>>(object: T): T =>
  Object.entries(object).reduce((cleaned, [key, value]) => {
    cleaned[key] = isStr(value) ? value.trim() : value
    return cleaned
  }, object)
