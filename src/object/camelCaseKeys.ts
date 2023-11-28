/** @module Object */

import { isArr } from '@array/isArr'
import { isObj } from '@object/isObj'
import { camelCase } from '@string/camelCase'
import { camelCaseArr } from '@array/camelCaseArr'

type TObj = Record<string, any>

export const camelCaseKeys = <
  R extends TObj=TObj,
  T=R,
>(item:T): R => {

  return Object.entries(item)
    .reduce((acc, [key, value]) => {
      const prop = camelCase(key) as string as keyof R

      acc[prop] = isObj<R>(value)
        ? camelCaseKeys<R>(value)
        : isArr(value)
          ? camelCaseArr(value)
          : value

      return acc
    }, {} as R)
}