/** @module Function */

import { isFunc } from './isFunc'

/**
 * Returns the first param if it's a function.
 * <br/>If first param is not a function, returns second param.
 * @example
 * eitherFunc(() => {}, 'bar')
 * // Returns first param because it's a function.
 * @example
 * eitherFunc('foo', 'bar')
 * // Returns 'bar'
 * @function
 * @param {Function} func1 - return if is func
 * @param {Function} func2 - use if first is not an object
 * @returns {Function}
 */
export const eitherFunc = <T=(...params: any[]) => any>(func1: (...params: any[]) => any, func2: (...params: any[]) => any): T => (isFunc(func1) && func1) as T || func2 as T
