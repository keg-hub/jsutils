/** @module Object */

import { isObj } from './isObj'

/**
 * Returns the first param if correct type of second param.
 * @function
 * @param {Object} obj1 - return if is object
 * @param {Object} obj2 - use if first is not an object
 * @returns {Object}
 */

export const eitherObj = <T = any, M = T>(obj1?: T, obj2?: M): T | M =>
  (isObj(obj1) && obj1) || obj2
