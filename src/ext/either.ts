/** @module Extra */

import { softFalsy } from '@boolean/softFalsy'
import { isFunc } from '@method/isFunc'

/**
 * Determines the correct value to return, by calling the passed in check function.
 * <br/>If no check function, then it uses the softFalsy method.
 * @example
 * either(0, 2)
 * // Returns 0
 * @example
 * either(null, 2)
 * // Returns 2
 * @example
 * either(1, 2, (val1, val2) => { return true })
 * // Returns 1
 * @function
 * @param {*} [val1] - return if passes in check method return true
 * @param {*} [val2] - return if passed in check method returns false
 * @param {Function} [check] - called to determine which value to return
 * @returns {*}
 */
export const either = <T=any>(val1?: any, val2?: any, check?: (v1:any, v2:any) => any): T =>
  !isFunc(check)
    ? (softFalsy(val1) && val1) || val2
    : (check(val1, val2) && val1) || val2
