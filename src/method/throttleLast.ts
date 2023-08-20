/** @module Function */

import { isNum } from '@number/isNum'

/**
 * Ensures the last call to the throttled function get called.
 * <br/>Will wait the allotted time, before calling the last call to it.
 * <br/>The final call will not execute until no more calls are made,
 * <br/>Accepts a callback to call each time the throttle called,
 * @example
 * throttleLast(() => {}, () => {})()
 * // throttle function
 * @function
 * @param {Function} func - method to call after wait
 * @param {Function} cb - method to call after throttle function is called
 * @param {Number} [wait=100] time to wait until executing func param
 * @return {Function} throttled function
 */

export function throttleLast(
  func: (...params: any[]) => any,
  wait?: number
): (...params: any[]) => any
export function throttleLast(
  func: (...params: any[]) => any,
  cb?: ((...params: any[]) => any) | number,
  wait?: ((...params: any[]) => any) | number
): (...params: any[]) => any {
  let throttleTimeout

  // Allow not passing in the cb, and just the func, and wait time
  if (isNum(cb)) {
    wait = cb as number
    cb = undefined
  }

  return function (...args) {
    // If the throttle already exists clear it, and create it again
    if (throttleTimeout) clearTimeout(throttleTimeout)
    // Store a reference to the timeout
    // Will wait the allotted time until calling the final call to it
    throttleTimeout = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(throttleTimeout)
    }, wait as number)

    typeof cb === 'function' && cb()
  }
}
