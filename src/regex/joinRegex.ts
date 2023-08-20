/** @module RegEx */

import { isStr } from '@string/isStr'
import { isArr } from '@array/isArr'
import { getRegexSource } from './getRegexSource'

/**
 * Helper for `joinRegex` that parses the args
 * @param {...*} args
 * @return {Array} [
 *  expressions array,
 *  options string
 * ]
 */
const parseArgs = (args: Array<any>) => {
  if (isArr(args[0])) return [args[0], args[1]]
  const last = args[args.length - 1]
  const options = isStr(last) ? last : undefined
  const expressions = options ? args.splice(0, args.length - 1) : args
  return [expressions, options]
}

/**
 * Joins regex together in one expression
 * <br/>You can technically use strings as well
 * <br/>But be careful that it's not the last element of a spread call
 * <br/>Or that will be interpreted as the "options" string.
 * @function
 * @param {...RegExp} expressions array of regex instances.
 * @example
 * // calling using spread args
 * const joined = joinRegex(/[A-z]+/, /[0-9]/, 'g')
 * joined === /([A-z]+|[0-9])/g
 * @example
 * // calling with an array
 * const joined = joinRegex([ ...allMyRegEx ], 'gi')
 */
export const joinRegex = (...args: [RegExp | string]): RegExp => {
  const [expressions, options] = parseArgs(args)

  // join the regex together in a capture group with the | operator
  const source = expressions.reduce((joined: string, next: RegExp | string) => {
    const nextSource = getRegexSource(next)
    return !nextSource
      ? joined
      : joined === ''
      ? nextSource
      : `${joined}|${nextSource}`
  }, '')

  return new RegExp(`(${source})`, options)
}
