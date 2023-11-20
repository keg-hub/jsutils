/** @module Function */

import { isFunc } from './isFunc'
import { emptyObj } from '@ext/noOps'

/**
 * Response returned from a limbo promise
 * @typedef TLimboResponse
 * @private
 * @type {Array}
 */

/**
 * Adds catch to a promise for better error handling of await functions
 * <br/>Removes the need for wrapping await in a try / catch
 * <br/>First argument is an Error when the promise throws or null when it resolves
 * <br/>Second argument is the response from the resolved promise
 * @example
 * const [ err, data ] = await limbo(promiseFunction())
 * // returns an array
 * // * err will be undefined if no error was thrown
 * // * data will be the response from the promiseFunction
 * @function
 * @param {Promise<Function>} promise - Promise to be resolved
 * @param {boolean} [asObject=false] - 2nd argument in resp array should be an object when an error is caught
 * @return {Promise<TLimboResponse>} - Slot 1 => error, Slot 2 => response from promise
 */
export function limbo<T = any>(
  promise: Promise<any>,
  asObj?: boolean
): Promise<[err?: Error, response?: T]>
export function limbo<T = any, E = Error>(
  promise: Promise<any>,
  asObj?: boolean
): Promise<[err?: E, response?: T]>
export function limbo(
  promise: Promise<any>,
  asObj?: boolean
): Promise<[err?: Error, response?: any]>
export function limbo<T=any, E=Error>(
  promise: Promise<any>,
  asObj: boolean = false
): Promise<[err?: E, response?: T]> {
  return (!promise || !isFunc(promise.then)
    ? [
        new Error(`A promise or thenable is required as the first argument!`),
        asObj ? emptyObj : undefined,
      ]
    : promise
        .then(data => [null, data])
        .catch(err => [
          err,
          asObj ? emptyObj : undefined,
        ])) as unknown as Promise<[E, T]>
}
