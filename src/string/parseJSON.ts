/** @module String */

/**
 * Convert JSON string into object, wrapped in a try / catch.
 * @function
 * @param {String} string
 * @return {Object} - JSON object
 */
export const parseJSON = <T = any>(str: string, logErr: boolean = true): T => {
  try {
    return JSON.parse(str)
  }
  catch (e) {
    logErr && console.error(e.message)
    return null
  }
}
