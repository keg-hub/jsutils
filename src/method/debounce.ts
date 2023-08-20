/** @module Function */

import { isFunc } from './isFunc'

/**
 * Limits the amount of calls to a function over time
 * @example
 * debounce(myFunction)
 * // Calls myFunction after the default 250 ms
 * @example
 * debounce(myFunction, 500)
 * // Calls myFunction after 500 ms
 * @example
 * debounce(myFunction, 500, true)
 * // Calls myFunction immediately
 * @function
 * @param {Function} func - function to call
 * @param {Number} wait - how long to wait between function calls
 * @param {Boolean} immediate - should call immediately
 * @return { void }
 */
export const debounce = <T=(...args:any[])=> any>(
  func: (...params: any[]) => any,
  wait?: number,
  immediate?: boolean
): T => {
  let timeout:NodeJS.Timeout

  function wrapFunc(...args) {
    if (!isFunc(func)) return null

    const context = this
    const later = () => {
      timeout = null
      !immediate && func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) return isFunc(func) && func.apply(context, args)
  }
  return wrapFunc as T
}
