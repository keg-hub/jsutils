/** @module Node */

import os from 'os'
import path from 'path'
const homeDir = os.homedir()

/**
 * Converts the local part of the passed in location to an absolute path
 * @function
 * @param {string} location - Path to be resolved
 *
 * @returns {string} - Resolved location
 */
export const resolvePath = (location:string, rootDir:string=process.cwd()):string => {
  return location.startsWith(`~`)
    ? path.resolve(path.join(homeDir, location.replace(`~`, '')))
    : location === `.`
      ? rootDir
      : location.startsWith(`./`)
        ? path.resolve(path.join(`${rootDir}/`, location.replace(`./`, ``)))
        : location.startsWith(`/`)
          ? path.resolve(location)
          : path.resolve(path.join(rootDir, location))
}
