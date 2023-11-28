/** @module Object */

import { isArr } from '@array/isArr'
import { isObj } from '@object/isObj'
import { snakeCase } from '@string/snakeCase'
import { snakeCaseArr } from '@array/snakeCaseArr'

type TObj = Record<string, any>

export const snakeCaseKeys = <
  R extends TObj=TObj,
  T=R,
>(item:T): R => {

  return Object.entries(item)
    .reduce((acc, [key, value]) => {
      const prop = snakeCase(key) as string as keyof R

      acc[prop] = isObj<R>(value)
        ? snakeCaseKeys<R>(value)
        : isArr(value)
          ? snakeCaseArr(value)
          : value

      return acc
    }, {} as R)
}