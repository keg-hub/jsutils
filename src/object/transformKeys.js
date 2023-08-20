/** @module Object */

import { emptyObj } from '@ext/noOps'

/**
 * Transforms the keys of an object to a matching key value in keyMap object
 * Keys not in the keyMap are included as is, unless strict === true option is passed
 * @example
 * transformKeys({my_key: `1234`, other_key: `4321`}, {my_key: `myKey`}) === { myKey: `1234`, other_key: `4321` }
 * @example
 * const opts = { strict: true }
 * transformKeys({my_key: `1234`, other_key: `4321`}, {my_key: `myKey`}, opts) === { myKey: `1234` }
 */
export const transformKeys = (
  obj = emptyObj,
  keyMap = emptyObj,
  opts = emptyObj
) => {
  const { strict = false } = opts

  return Object.entries(obj).reduce((acc, [ key, value ]) => {
    const ref = keyMap[key] || (!strict ? key : undefined)
    ref && (acc[ref] = value)

    return acc
  }, {})
}
