/** @module String */

import { reverseStr } from './reverseStr'
import { getWordStartingAt } from './getWordStartingAt'

/**
 * Gets the word in text ending at index (exclusive)
 * @function
 * @param {String} text
 * @param {Number} index - the exclusive ending index of the word to get
 * @param {Array<string>?} delimiters - optional array of strings that delimit the start of words. Defaults to the space character.
 * @example
 * const text = 'foo bar bin'
 * const word = getWordEndingAt(text, 3)
 * word === 'foo'
 */
export const getWordEndingAt = <T extends string = string>(
  text: string,
  index: number,
  delimiters: string[] = [' ']
): T => {
  const reversed = reverseStr(text)
  const reversedIndex = text.length - index
  return reverseStr(getWordStartingAt(reversed, reversedIndex, delimiters)) as T
}
