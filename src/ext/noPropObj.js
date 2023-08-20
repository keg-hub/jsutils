/** @module Extra */

import { deepFreeze } from '@object/deepFreeze'

/**
 * Reusable frozen object that contains a `content` object. Useful
 * @object
 * for themes that rely on the content key.
 * @type {Object}
 */
export const noPropObj = deepFreeze({ content: {} })
