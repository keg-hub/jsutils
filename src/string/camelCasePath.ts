/** @module String */

import { capitalize } from './capitalize'

/**
 * Turns a path string into a camel-cased string, if there is more than one
 * step in the path. If there isn't, just returns path.
 * @function
 * @param {String} path
 * @return {String} camel-cased string
 * @example
 * camelCasePath('settings.agendaMap.Count') -> 'settingsAgendaMapCount'
 * camelCasePath('settings') -> 'settings'
 */
export const camelCasePath = <T extends string=string>(path: string): T => {
  const split = path.split('.')
  const camelCasedSplit = split.map((str, idx) =>
    idx > 0 ? capitalize(str, false) : str
  )

  return camelCasedSplit.length > 1 ? camelCasedSplit.join('') as T : path as T
}
