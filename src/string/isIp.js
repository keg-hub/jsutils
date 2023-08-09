/** @module String */

import { isStr } from './isStr'

const regex = {
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
}

/**
 * Check if string is an Ip address, both Ip4 and Ip6
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's an Ip address
 */
export const isIp = str => {
  if (!str || !isStr(str)) return false

  const isIp4 = Boolean(regex.ipv4.test(str))
  return isIp4 || Boolean(regex.ipv6.test(str))
}

/**
 * Check if string is an IP4 address
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's an IP4 address
 */
export const isIp4 = str => {
  if (!str || !isStr(str)) return false

  return Boolean(regex.ipv4.test(str))
}

/**
 * Check if string is an IP6 address
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's an IP6 address
 */
export const isIp6 = str => {
  if (!str || !isStr(str)) return false

  return Boolean(regex.ipv6.test(str))
}
