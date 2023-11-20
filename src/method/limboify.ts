/** @module Function */

import { limbo } from './limbo'

/**
 * Converts a method with a callback as the last argument into a promise
 * @function
 * @param {*} cb - method to wrap in a promise
 * @param {*} args - Arguments to pass to the callback method
 * @example
 * limboify(fs.rename, 'my/file.txt', 'my/renamed-file.txt')
 * @example
 * limboify(fs.mkdir, 'my/new/directory', { recursive: true })
 *
 * @returns {Promise|*} - Success response of fs.rename method
 */
export const limboify = <T = any>(
  cb: (...params: any[]) => any,
  ...args: any[]
): Promise<[err?: Error, response?: T]> => {
  return limbo(
    new Promise((res, rej) =>
      cb(...args, (err: Error, success: any) =>
        err ? rej(err) : res(success || true)
      )
    )
  )
}
