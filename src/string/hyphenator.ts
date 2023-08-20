/** @module String */

const uppercasePattern = /[A-Z]/g
const msPattern = /^ms-/

/**
 * Hyphenator cache, that stores already hyphenated text to be reused
 * @private
 * @Object
 */
const hyphenCache = {}

/**
 * Converts a matching style rule to lowercase with hyphen
 * External hyphenator helpers, created outside the method to improve performance
 * @function
 * @private
 * @param {String} str - camelCase style rule rule
 *
 * @returns {String} - Lowercase style rule with hyphen at the start
 */
const toHyphenLower = (match: string) => '-' + match.toLowerCase()

/**
 * Converts a camelCase style rule into a hyphenated style rule
 * <br/>Caches the response to make future conversions faster
 * @function
 * @param {String} str - camelCase style rule rule
 *
 * @returns {String} - Hyphenated style rule
 */
export const hyphenator = <T extends string = string>(str: string): T => {
  if (hyphenCache.hasOwnProperty(str)) return hyphenCache[str]

  const hRule = str.replace(uppercasePattern, toHyphenLower)
  return (hyphenCache[str] = msPattern.test(hRule) ? '-' + hRule : hRule) as T
}
