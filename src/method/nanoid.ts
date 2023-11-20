/** @module Function */

import { emptyObj } from '@ext/noOps'
import { uuid } from './uuid'
import { doIt } from './doIt'
import { isObj } from '@object/isObj'
import { isStr } from '@string/isStr'

export type TNanoidOpts = {
  joiner?: string
  parts?: number
  prefix?: string
}

const sudoRandomStr = (str: string) => {
  const times = Math.floor(str.length / 2)
  return doIt(times, {}, () =>
    str.charAt(Math.floor(Math.random() * str.length))
  ).join(``)
}

const sudoRandomNum = () => {
  return Math.floor(Math.floor(Math.random() * Date.now()))
}

const sudoRandom = (radix = 36) => {
  return sudoRandomNum().toString(radix)
}

/**
 * Generates am ID using the UUID method, but makes it shorter
 * Also allows passing some custom options like a prefix for the generated ID
 */
export const nanoid = (
  base?: string | TNanoidOpts,
  opts?: TNanoidOpts
): string => {
  if (!isObj(opts)) {
    if (isObj(base)) {
      opts = base
      base = undefined
    } else opts = emptyObj
  }

  const { parts = 2, prefix = ``, joiner = `.` } = opts

  const seed = (isStr(base) && base) || sudoRandom(16)
  const salt = uuid().split(`-`)

  let count = 0
  const gen = () => {
    count++
    const even = count % 2 === 0
    return sudoRandomStr((even && salt.pop()) || seed)
  }

  return `${prefix ? `${prefix}${joiner}` : ``}${doIt(parts, {}, gen).join(
    joiner
  )}`
}
