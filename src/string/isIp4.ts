/** @module String */

import { isStr } from './isStr'

export const ip4RegEx =
  /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

/**
 * Check if string is an IP4 address
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's an IP4 address
 */
export const isIp4 = <T extends string = string>(str: string): str is T => {
  if (!str || !isStr(str)) return false

  return Boolean(ip4RegEx.test(str))
}
