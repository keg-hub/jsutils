/** @module Array */

import { snakeCaseProps } from '@collection/snakeCaseProps'

type TArr = any[]

export const snakeCaseArr = <
  R extends TArr=TArr,
  T=R,
>(items:T[]) => items.map(item => snakeCaseProps<R, T>(item))

