/** @module Object */

import { isFunc } from '@method/isFunc'
import { isObj } from './isObj'

/**
 * Loop over and objects props and values and reduce to new object.
 * @function
 * @param {Object} obj - Object to reduce over it's properties
 * @param {Function} cb - Method to call on each property of the obj argument
 * @param {Object} [start] - Starting accumulator object passed to the reduce method
 * @return {Object} - updated object after running the reduce method
 */
export const reduceObj = <T=any>(
  obj:Record<string, any>,
  cb:(key: string, value: any, data: any) => any,
  start:any={}
): T =>
  (isObj(obj) &&
    isFunc(cb) &&
    Object.entries(obj).reduce(
      (data, [ key, value ]) => cb(key, value, data),
      start
    )) ||
  start
