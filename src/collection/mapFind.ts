/** @module Collection */

import { isColl } from './isColl'
import { isObj } from '@object/isObj'
import { isFunc } from '@method/isFunc'
import { exists } from '@ext/exists'
import { validate } from '@validation/validate'

/**
 * Helper for mapFind, handling the array case
 * @private
 * @param {Array} arr
 * @param {Function} mapper
 * @param {Function} testFunc
 * @returns {*}
 */
const mapFindArr = (
  arr: any[],
  mapper: (...params: any[]) => any,
  testFunc: (...params: any[]) => any = exists
) => {
  // iterate over each value in the array,
  // returning when a mapped value is found that passes `testFunc`
  for (let i = 0; i < arr.length; i++) {
    const mappedValue = mapper(arr[i], i, i)
    if (testFunc(mappedValue, i, i)) return mappedValue
  }

  return null
}

/**
 * Helper for mapFind, handling the object case
 * @private
 * @param {Object} obj
 * @param {Function} mapper
 * @param {Function} testFunc
 * @returns {*}
 */
const mapFindObj = (
  obj: Record<any, any>,
  mapper: (...params: any[]) => any,
  testFunc: (...params: any[]) => any = exists
): any => {
  let idx = 0

  // iterate over each property in the object
  // returning when a mapped value is found that passes `testFunc`
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue

    const value = obj[key]
    const mappedValue = mapper(value, key, idx)
    if (testFunc(mappedValue, key, idx)) return mappedValue

    idx++
  }

  return null
}

/**
 * Finds the first element in coll whose mapped value passes the testFunc function, then returns
 * the **mapped** value.
 * It will not map the entire array or object; only the subset needed to find the first passing element.
 * @function
 * @param {Array|Object} coll - Elements to map and find
 * @param {Function} mapper - Mapping function of form: (value, key, idx) -> *. "key" is the index when coll is an array. "idx" is the index of the array value or object entry.
 * @param {Function?} testFunc - Predicate function of form: (mappedValue, key, idx) -> true/false. Defaults to checking if the mapped value is defined. "key" is the index when coll is an array.
 * @returns {*} - The first passing mapped value
 *
 * @example
 * // Find the first file path that can be required from disk
 * const filePaths = [...]
 * const loadedFile = mapFind(filePaths, tryRequireSync)
 *
 * @example
 * // Find the first file path whose required value is an object
 * const filePaths = [...]
 * const loadedFile = mapFind(filePaths, tryRequireSync, isObj)
 *
 * @example
 * // Find the first file path whose required value is an object
 * const filePaths = { document: "foo/bar/doc.txt", image: "foo/bar/pic.img"}
 * const loadedFile = mapFind(filePaths, (value, key) => tryRequireSync(value), isObj)
 */
export const mapFind = (
  coll: Record<any, any> | any[],
  mapper: (...params: any[]) => any,
  testFunc: (...params: any[]) => any = exists
): any => {
  const [valid] = validate(
    { coll, mapper, testFunc },
    { coll: isColl, $default: isFunc }
  )
  if (!valid) return undefined

  return isObj(coll)
    ? mapFindObj(coll, mapper, testFunc)
    : mapFindArr(coll as any[], mapper, testFunc)
}
