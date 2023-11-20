/** @module Extra */

/**
 * Wraps the passed in callback in a try catch, then calls the callback
 * Returns the callbacks response or undefined if the callback throws
 * @function
 * @param {function} cb - Function to wrap in a try catch, then call
 * @param {Array<any>} [args=any[]] - Arguments to pass to the passed in callback
 * @returns <unknown>
 */
export const tri = <T=unknown>(cb:(...args:any) => any, ...args:any[]):T => {
  try { return cb(...args) as T }
  catch(err){}
}
