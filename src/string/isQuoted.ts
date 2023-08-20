/** @module String */

import { isStr } from './isStr'

const quoteSymbols = ['"', "'"]

/**
 * Checks if the string contains quoted text
 * @function
 * @param {String} str - string to check
 * @param {Array<string>?} [quotes] - optional array of valid quote strings to check with. Defaults to single and double quote characters.
 * @return {Boolean} true if `str` is a quoted string
 * @example
 * isQuoted('foo') // false
 * @example
 * isQuoted('"foo"') // true
 */
export const isQuoted = <T extends string = string>(
  str: string,
  quotes: string[] = quoteSymbols
): str is T => {
  return (
    isStr(str) &&
    quotes.some(quote => str.startsWith(quote) && str.endsWith(quote))
  )
}
