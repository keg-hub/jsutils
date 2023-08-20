/** @module Object */

/**
 * Checks if prop exists on the object.
 * @function
 * @param {Object} obj - data to check
 * @param {String} prop - prop to check for
 * @returns {Boolean} T/F if the prop exists
 */
export const hasOwn = (obj: Record<any, any>, prop: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, prop)