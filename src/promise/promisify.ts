/** @module Promise */

import { isFunc } from '@method/isFunc'

/**
 * Converts a standard callback method into Promise
 * @param {Function} method - Function to convert into a promise
 * @function
 *
 * @return {Promise<Function>} - Passed in method converted into a promise
 */
export const promisify = (method: (...params: any[]) => any): (...args:any[]) => Promise<(...params: any[]) => any> => {
  if (!isFunc(method)) throw `Argument must be a function`

  return ((...args:any[]) => {
    return new Promise((res, rej) => {
      // If the last arg is not a function, just return the resolved method
      if (!isFunc(args[args.length - 1])) return res(method(...args))

      // Remove the callback method
      args.pop()
      // Replace it with the promise resolve / reject
      args.push((...cbData) => {
        // If the cbData first arg is not falsy, then reject the promise
        // Otherwise resolve it
        // @ts-ignore
        return cbData && cbData[0] ? rej(...cbData) : res(...cbData as any[])
      })

      // Call the method, and return it
      return method(...args)
    })
  })
}
