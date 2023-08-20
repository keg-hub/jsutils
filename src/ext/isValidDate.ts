/** @module Extra */

/**
 * Checks is passed in date is a valid date.
 * @example
 * isValidDate(new Date())
 * // Returns true
 * @example
 * isValidDate(new Date().toString())
 * // Returns true
 * @example
 * isValidDate('12345678')
 * // Returns false
 * @function
 * @param { Date|String } date - value to check
 * @return {Boolean} T/F - if passed in date is a valid date
 */
export const isValidDate = <T=Date>(date: any): date is T =>
  !isNaN(((date instanceof Date && date) || new Date(date)).getTime())
