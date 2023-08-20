/** @module Function */

import { isBool } from '@boolean/isBool'
import { isStrBool } from '@boolean/isStrBool'

import { isColl } from '@collection/isColl'
import { isEmptyColl } from '@collection/isEmptyColl'
import { deepEqual } from '@collection/deepEqual'

import { isDom } from '@dom/isDom'

import { exists } from '@ext/exists'
import { isEmpty } from '@ext/isEmpty'
import { isSame } from '@ext/isSame'
import { isValidDate } from '@ext/isValidDate'

import { isFunc } from './isFunc'
import { identity } from './identity'
import { isOrderable } from './isOrderable'

import { equalsNaN } from '@number/equalsNaN'
import { isFloat } from '@number/isFloat'
import { isInt } from '@number/isInt'
import { isNum } from '@number/isNum'
import { isNegative } from '@number/isNegative'
import { isPositive } from '@number/isPositive'

import { hasOwn } from '@object/hasOwn'
import { isEntry } from '@object/isEntry'
import { isArrMap } from '@object/isArrMap'
import { isObj } from '@object/isObj'
import { jsonEqual } from '@object/jsonEqual'

import { isRegex } from '@regex/isRegex'

import { isEmail } from '@string/isEmail'
import { isIp } from '@string/isIp'
import { isLowerCase } from '@string/isLowerCase'
import { isPhone } from '@string/isPhone'
import { isQuoted } from '@string/isQuoted'
import { isStr } from '@string/isStr'
import { isUpperCase } from '@string/isUpperCase'
import { isUrl } from '@string/isUrl'
import { isUuid } from '@string/isUuid'

import { isValidUrl } from '@url/isValidUrl'

/**
 * When called, it calls original function, then returns inverse of the functions result
 * <br/>Should be used with functions that return a boolean
 * @function
 * @param {Function} func - Function call and invert its response
 *
 * @returns {Function} - Calls the passed in function then returns True if the passed in function returns falsy, otherwise false
 */
export const not = (
  func: (...args: any[]) => any
): ((...arg: any[]) => boolean) => {
  return (...args: any[]) => !func.apply(null, args)
}

not.bool = not(isBool)
not.strBool = not(isStrBool)
not.coll = not(isColl)
not.deepEqual = not(deepEqual)
not.emptyColl = not(isEmptyColl)
not.dom = not(isDom)
not.exists = not(exists)
not.empty = not(isEmpty)
not.same = not(isSame)
not.validDate = not(isValidDate)
not.func = not(isFunc)
not.identity = not(identity)
not.orderable = not(isOrderable)
not.equalsNaN = not(equalsNaN)
not.float = not(isFloat)
not.int = not(isInt)
not.num = not(isNum)
not.negative = not(isNegative)
not.positive = not(isPositive)
not.hasOwn = not(hasOwn)
not.entry = not(isEntry)
not.arrMap = not(isArrMap)
not.obj = not(isObj)
not.jsonEqual = not(jsonEqual)
not.regex = not(isRegex)
not.email = not(isEmail)
not.ip = not(isIp)
not.lowerCase = not(isLowerCase)
not.phone = not(isPhone)
not.quoted = not(isQuoted)
not.str = not(isStr)
not.upperCase = not(isUpperCase)
not.url = not(isUrl)
not.uuid = not(isUuid)
not.validUrl = not(isValidUrl)
