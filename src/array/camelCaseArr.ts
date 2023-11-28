/** @module Array */

import { camelCaseProps } from '@collection/camelCaseProps'

type TArr = any[]

export const camelCaseArr = <
  R extends TArr=TArr,
  T=R,
>(items:T[]) => items.map(item => camelCaseProps<R, T>(item))

