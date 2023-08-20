/** @module Function */

import { isFunc } from './isFunc'
import { ensureArr } from '../array/ensureArr'

const defFilters = [ `node:internal`, `node_modules/jest` ]

/**
 * Gets the paths from a stacktrace as CallSites and returns them
 * @function
 * @param {Array|Function} filter - List of paths to ignore, or function that returns truthy to ignore
 *
 * @returns {Array<string>} - List of paths from the stackTrace
 */
export const stackTracePaths = (filter:string[] = defFilters) => {
  const orgPreStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = (_, stack) => stack

  const stack = ensureArr(new Error().stack.slice(1))
  
  Error.prepareStackTrace = orgPreStackTrace

  return stack.reduce((acc, cs) => {
    const loc = cs.getFileName()
    if (!loc) return acc

    const ignore = isFunc(filter)
      ? filter(loc, cs, stack)
      : Boolean(
        filter.length && filter.find(filterLoc => loc.includes(filterLoc))
      )

    !ignore && acc.push(loc)

    return acc
  }, [] as string[])
}
