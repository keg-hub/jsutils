/** @module Collection */

import { isArr } from '@array/isArr'
import { isObj } from '@object/isObj'
import { snakeCaseArr } from '@array/snakeCaseArr'
import { snakeCaseKeys } from '@object/snakeCaseKeys'

type TArr<T=any> = T[]
type TCol=TObj|TArr
type TObj = Record<string, any>


export const snakeCaseProps = <
  R extends TCol=TCol,
  T=R,
>(data:T) => {
  if(isObj<TObj>(data)) return snakeCaseKeys<R, T>(data)
  if(isArr<R>(data)) return snakeCaseArr<TArr, T>(data) as R

  return data
}

