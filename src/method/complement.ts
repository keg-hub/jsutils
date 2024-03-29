/** @module Function */

import { isFunc } from '@method/isFunc'
import { validate } from '@validation/validate'

/**
 * Returns a new function that is the complement of predicate function `predicate`
 * @function
 * @param {Function} predicate
 * @returns {Function?} the complement of `predicate`, if it's a function, otherwise null
 * @example
 * const isNegative = x => (x < 0)
 * const isNonNegative = complement(isNegative)
 * isNonNegative(1) // true
 */
export const complement = (predicate: (...args: any[]) => any) => {
  const [valid] = validate({ predicate }, { predicate: isFunc })
  return valid ? (...args: any[]) => !predicate(...args) : null
}
