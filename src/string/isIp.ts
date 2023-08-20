/** @module String */

import { isStr } from './isStr'
import { isIp4 } from './isIp4'
import { isIp6 } from './isIp6'

/**
 * Check if string is an Ip address, both Ip4 and Ip6
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's an Ip address
 */
export const isIp = <T extends string=string>(str: string):str is T => {
  if (!str || !isStr(str)) return false

  return isIp4(str) || isIp6(str)
}
