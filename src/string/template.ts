/** @module String */

import { isFunc } from '@method/isFunc'
import { isColl } from '@collection/isColl'
import { get } from '@collection/get'
import { isStr } from './isStr'

type TTempFun = (<T extends string = string>(
  tempStr: string,
  data: Record<any, any> | any[],
  fallback: any
) => T) & {
  regex?: RegExp
}

/**
 * Helper to wrap the template method, and allow passing a custom regex argument
 * Custom regex is used instead the default regex of the template method
 * @function
 * @example
 * template('${{ who }} in ${{ where }}!', { who: 'goats', where: 'boats' })
 * // Returns "goats in boats"
 * @param {String} template - String with ES6 syntax items to be replaced
 * @param {Object|Array} data - Data used to replace the ES6 placeholders
 * @param {any} fallback - Used it data does not contain key to be replaced
 * @param {Object} [RegEx?] - Regular Express to replace the default
 *
 * @returns {String} - template with placeholder values filled
 */
export const templateRx = <T extends string = string>(
  tempStr: string,
  data: Record<any, any> | any[],
  fallback: any = ``,
  rx?: RegExp
): T => {
  const orgRx = template.regex
  template.regex = rx || /{{([^}]*)}}/g
  const resp = template(tempStr, data, fallback)
  template.regex = orgRx

  return resp as T
}

/**
 * Simple template replace for ES6 template strings
 * @function
 * @example
 * template('${ who } in ${ where }!', { who: 'goats', where: 'boats' })
 * // Returns "goats in boats"
 * @param {String} template - String with ES6 syntax items to be replaced
 * @param {Object|Array} data - Data used to replace the ES6 placeholders
 * @param {any} fallback - Used it data does not contain key to be replaced
 *
 * @returns {String} - template with placeholder values filled
 */
export const template: TTempFun = <T extends string = string>(
  tempStr: string,
  data: Record<any, any> | any[],
  fallback: any = ``
): T => {
  data = (isColl(data) && data) || {}
  const regex = template.regex || /\${(.*?)\}/g

  return isStr(tempStr)
    ? (tempStr.replace(regex, (match, exact) => {
        const path = (exact || match.substring(2, match.length - 3)).trim()
        const replaceWith = get(data, path, fallback)
        return isFunc(replaceWith)
          ? replaceWith(data, path, fallback)
          : replaceWith
      }) as T)
    : (() => {
        console.error(`template requires a string as the first argument`)
        return tempStr as T
      })()
}
