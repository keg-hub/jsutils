/** @module Promise */

'use strict'

/**
 * Stops execution for a given amount of time
 * @function
 * @param {Number} time - Amount of time to wait
 * @return { void }
 */
export const wait = (time: number = 0) =>
  new Promise(res => setTimeout(() => res(true), time))
