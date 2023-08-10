/** @module Extra */

import { deepFreeze } from '@object/deepFreeze'

/**
 * Reuseable empty, frozen object
 * @object
 * @type {Object}
 */
export const noOpObj = Object.freeze({})

/**
 * Reuseable empty, frozen object
 * @object
 * @type {Object}
 */
export const emptyObj = noOpObj

/**
 * Reusable frozen object that contains a `content` object. Useful
 * @object
 * for themes that rely on the content key.
 * @type {Object}
 */
export const noPropObj = deepFreeze({ content: {} })

/**
 * Reusable, empty frozen array
 * @array
 * @type {Array}
 */
export const noPropArr = deepFreeze([])

/**
 * Reusable, empty frozen array.
 * Renamed for consistency
 * @array
 * @type {Array}
 */
export const noOpArr = noPropArr

/**
 * Reusable, empty frozen array.
 * Renamed for legibility
 * @array
 * @type {Array}
 */
export const emptyArr = noPropArr
