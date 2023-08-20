/** @module Function */

import { get } from '@collection/get'

/**
 * Clones a function using the Function constructor and calling toString on the passed in function
 * @example
 * const func = () => { console.log('test') }
 * const clone = cloneFunc(func)
 * // clone !== func
 * @function
 * @param {Function} func - function to clone
 *
 * @returns {Object} cloned function
 */
export const cloneFunc = <T=any>(func: (...params: any[]) => any): T => {
  const funcClone = function (...args:any[]) {
    return func instanceof funcClone
      ? (() => {
          return new (func as any)(...args)
        })()
      : get(func.prototype, 'constructor.name')
        ? new (func as any)(...args)
        : func.apply(func, args)
  }

  for (let key in func) func.hasOwnProperty(key) && (funcClone[key] = func[key])

  Object.defineProperty(funcClone, 'name', {
    value: func.name,
    configurable: true,
  })
  funcClone.toString = () => func.toString()

  return funcClone as T
}
