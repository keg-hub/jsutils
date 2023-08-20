/** @module Function */

import { isNum } from '@number/isNum'
import { hasOwn } from '@object/hasOwn'
import { isFunc } from './isFunc'
import { noOp } from './noOp'

/**
 * Creates a method to memorize passed in methods output
 * @example
 * memorize(myFunction, cacheKeyFunction)
 * @example
 * memorize(myFunction, cacheKeyFunction, 100)
 * @function
 * @param {Function} func - method to memorize output of
 * @param {Function} getCacheKey - gets the key to save cached output
 *
 * @return {Function} memorized function with cache
 */
export const memorize = (
  func: (...params: any[]) => any,
  getCacheKey: (...params: any[]) => any,
  limit = 1
): ((...params: any[]) => any) => {
  if (!isFunc(func) || (getCacheKey && !isFunc(getCacheKey))) {
    console.error('Error: Expected a function', func, getCacheKey)
    return noOp
  }

  let memorized = function () {
    const cache = (memorized as any).cache
    const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0]

    if (hasOwn(cache, key)) return cache[key]

    const result = func.apply(this, arguments)

    isNum(limit) && Object.keys(cache).length < limit
      ? (cache[key] = result)
      : ((memorized as any).cache = { [key]: result })

    return result
  }

  // @ts-ignore
  memorized.cache = {}
  // @ts-ignore
  memorized.destroy = () => {
    getCacheKey = undefined
    // @ts-ignore
    memorized.cache = undefined
    // @ts-ignore
    memorized.destroy = undefined
    memorized = undefined
  }

  return memorized
}
