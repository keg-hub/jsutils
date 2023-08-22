/** @module Function */

import { isFunc } from './isFunc'

/**
 * Check if the passed in method is a function, and calls it
 * @example
 * checkCall((param1) => { return param1 }, 'foo')
 * // Returns 'foo'
 * @function
 * @param {Function} method - function to call
 * @param {Object} params - params to pass to the method on call
 * @return {*} - whatever the passed in method returns
 */
export function checkCall<P = unknown, T = unknown>(
  method: (param?: P, ...params: any[]) => T,
  param?: P,
  ...params: any[]
): T
export function checkCall<T = any>(
  method: <M = any>(...params: any[]) => M,
  ...params: any[]
): T
export function checkCall<T = any, M = any>(
  method: (...params: any[]) => M,
  ...params: any[]
): T
export function checkCall<T = any>(
  method: (...params: any[]) => any,
  ...params: any[]
): T
export function checkCall(
  method: (...params: any[]) => any,
  ...params: any[]
): any {
  return isFunc(method) ? method(...params) : undefined
}
