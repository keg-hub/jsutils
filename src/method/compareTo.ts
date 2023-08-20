/** @module Function */

import { isStr } from '@string/isStr'
import { isOrderable } from './isOrderable'
import { validate } from '@validation/validate'

/**
 * Generic compare to method that works for strings, numbers, and booleans
 * @function
 * @param {string | number | boolean} x
 * @param {string | number | boolean} y
 * @return { number | null } - returns a value < 0 if x is less than y, 0 if they are equal, and a value greater than 0 if x is greater than y. Returns null if the args are not comparable.
 */
export const compareTo = (
  x: string | number | boolean,
  y: string | number | boolean
): number | null => {
  const [valid] = validate({ x, y }, { $default: isOrderable })
  if (!valid) return null

  return isStr(x)
    ? (x as string).localeCompare(y as string)
    : (x as number) - (y as number)
}
