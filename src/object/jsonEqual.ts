/** @module Object */

/**
 * Compares two objects by converting to JSON, and checking string equality.
 * @function
 * @param { object | array } one - object to compare with param two
 * @param { object | array } two - object to compare with param one
 * @return {Boolean} status of equality
 */
export const jsonEqual = (one: any, two: any): boolean => {
  try {
    return JSON.stringify(one) === JSON.stringify(two)
  }
  catch (e) {
    return false
  }
}
