/** @module Collection */

import { isArr } from '@array/isArr'
import { isObj } from '@object/isObj'
import { camelCaseArr } from '@array/camelCaseArr'
import { camelCaseKeys } from '@object/camelCaseKeys'

type TArr = any[]
type TCol=TObj|TArr
type TObj = Record<string, any>


export const camelCaseProps = <
  R extends TCol=TCol,
  T=R,
>(data:T) => {
  if(isObj<TObj>(data)) return camelCaseKeys<R, T>(data)
  if(isArr<TArr>(data)) return camelCaseArr<TArr, T>(data) as R

  return data as R
}