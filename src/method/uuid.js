/** @module Function */

/**
 * Creates a uuid, unique up to around 20 million iterations.
 * @example
 * uuid()
 * // New uuid as a string
 * @function
 * @param {Number} [start] of the uuid
 * @return {String} - build uuid
 */
export const uuid = a =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)
