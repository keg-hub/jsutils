/** @module String */

import { isStr } from './isStr'

export const ip6RegEx =
  /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i

/**
 * Check if string is an IP6 address
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's an IP6 address
 */
export const isIp6 = <T extends string = string>(str: string): str is T => {
  if (!str || !isStr(str)) return false

  return Boolean(ip6RegEx.test(str))
}
