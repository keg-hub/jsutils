/** @module String */

import { isStr } from './isStr'

/**
 * Check if string is a phone number.
 * @function
 * @param {String} str - string to check
 * @return {Boolean} - True if str is a phone number
 */
export const isPhone = <T extends string = string>(str: string): str is T => {
  if (!str || !isStr(str)) return false
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11
}
