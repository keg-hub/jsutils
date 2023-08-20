/** @module Node */

import os from 'os'

/**
 * Gets and normalizes the current operating system
 * @function
 *
 * @returns {String} - The current operating system
 */
export const getOS = (): string|boolean => {
  const system = (process.platform || os.platform()).toLowerCase()
  return system === `darwin`
    ? `mac`
    : system === `win32` || system === `win64`
      ? `win`
      : system === `linux`
        ? `lin`
        : false
}

