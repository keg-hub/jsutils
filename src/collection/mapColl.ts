/** @module Collection */

import { isFunc } from '@method/isFunc'
import { isColl } from './isColl'
import { isArr } from '@array/isArr'

/**
 * Loops over a collection and calls a passed in function for each one.
 * @example
 * mapColl([1, 2, 3], (key, val, coll) => { console.log(key) })
 * // Will log all keys of the collection
 * @function
 * @param {Array|Object} coll - Collection to loop over
 * @return {Array|Object} returns the same type of collection passed in
 */
export const mapColl = <T=Record<any, any>|any[]>(coll: Record<any, any>|any[], cb:(key:string, val:any, col:typeof coll) => any): T =>
  isFunc(cb) && isColl(coll)
    ? Object.keys(coll).map(key => cb(key, coll[key], coll)) as T
    : isArr(coll)
      ? [] as T
      : {} as T
