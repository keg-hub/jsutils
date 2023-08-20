/** @module Object */

import { sanitize } from '@string/sanitize'

/**
 * Sanitizes all html strings in an object's properties.
 * @function
 * @param {Object} obj - Object to be sanitize
 * @return {Object} - obj with strings sanitized
 */
export const sanitizeCopy = (obj: Record<string, any>): Record<string, any> =>
  JSON.parse(sanitize(JSON.stringify(obj)))
