import { noOp } from './noOp'
import { isFunc } from './isFunc'
import { isBool } from '@boolean/isBool'
import { eitherObj } from '@object/eitherObj'

/**
 * Converts the passed in method into a callback to allow calling the method in place
 * Second argument can be a boolean or defaults object
 * When boolean, if true, the callback will forward arguments when called, false will not
 * When object, will be passed as the first argument of the callback
 *   * Checks the `allowArgs` property to know if it should forward arguments to the callback
 */
export const asCallback = <T=(...args:any[])=>any>(callback:T, defs:Record<any, any>|boolean):T => {
  if (!isFunc(callback)) return noOp as T

  const defArgs = isBool(defs)
    ? { allowArgs: defs }
    : eitherObj(defs, { allowArgs: true })

  return ((...args:any[]) => {
    return defArgs?.allowArgs ? (callback as any)(defArgs, ...args) : (callback as any)()
  }) as T 
}
