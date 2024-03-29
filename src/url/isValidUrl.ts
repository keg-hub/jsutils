/** @module Url */

/**
 * Checks if the given string is a valid URL
 * Must begin with ftp/http/https
 * @param {String} str - any string to check if it's a valid url
 * @function
 * @returns {Boolean}
 */
export const isValidUrl = <T extends string = string>(
  str: string
): str is T => {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

  return regexp.test(str)
}
