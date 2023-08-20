/** @module Object */

import { isFunc } from '@method/isFunc'
import { pipeline } from '@method/pipeline'
import { isObj } from './isObj'

/**
 * Like "some" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj - Object to have it's properties checked
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @param {Boolean} [logError=true] - Boolean indicating if errors should be logged
 * @returns {Boolean} - True if at least one entry satisfied the predicate, false if not
 */
export const someEntry = (obj: Record<string, any>, predicate: (key:string, value:string) => boolean, logError:boolean=true): boolean => {
  if (!isObj(obj)) {
    logError && console.error(`First argument ${obj} must be an object.`)
    return false
  }

  if (!isFunc(predicate)) {
    logError && console.error(`Second argument ${predicate}, must a function`)
    return false
  }

  return pipeline(obj, Object.entries, entries =>
    entries.some(([ key, value ]) => predicate(key, value))
  )
}
