/** @module Object */

import { isFunc } from '../method/isFunc'
import { pipeline } from '../method/pipeline'
import { isObj } from './isObj'

/**
 * Like "every" for arrays, but operates across each entry in an object
 * @function
 * @param {Object} obj - Object to the it's entries iterated on
 * @param {Function} predicate - Function of form (key, value) => boolean. Returns true or false for the entry
 * @param {Boolean} [logError=true] - Boolean indicating if errors should be logged
 * @returns {Boolean} - Boolean indicating that every entry satisfied the predicate or not
 */
export const everyEntry = (obj, predicate, logError = true) => {
  if (!isObj(obj)) {
    logError && console.error(`First argument ${obj} must be an object.`)
    return false
  }

  if (!isFunc(predicate)) {
    logError && console.error(`Second argument ${predicate}, must a function`)
    return false
  }

  return pipeline(obj, Object.entries, entries =>
    entries.every(([ key, value ]) => predicate(key, value))
  )
}
