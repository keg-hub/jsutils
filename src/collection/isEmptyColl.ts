/** @module Collection */

import { isColl } from './isColl'
import { isArr } from '@array/isArr'

/**
 * Checks if passed in obj || array is empty.
 * @example
 * isEmptyColl({})
 * // Returns true
 * @example
 * isEmptyColl({ foo: 'bar' })
 * // Returns false
 * @example
 * isEmptyColl([])
 * // Returns true
 * @function
 * @param {*} obj - Object to check if empty
 * @return {Boolean} - True if the passed in collection is empty
 */
export const isEmptyColl = obj =>
  isArr(obj)
    ? obj.length === 0
    : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0
