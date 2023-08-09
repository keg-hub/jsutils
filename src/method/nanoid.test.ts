// @ts-nocheck

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import { doIt } from './doIt'
import { nanoid } from './nanoid'

describe(`nanoid`, () => {

  test(`it generates a new id`, () => {
    const id = nanoid()
    expect(typeof id).toBe(`string`)
    expect(id.length).toBe(12)
  })

  test(`it does not generate duplicates`, () => {
    expect(() => {
      const id = nanoid()
      expect(id).not.toEqual(id)
    }).toThrow()
    
    let ids = []
    doIt(10, {}, () => {
      const id = nanoid()
      expect(ids.includes(id)).toBe(false)
      ids.push(id)
    })

    ids = []
    doIt(10, {}, () => {
      const id = nanoid()
      expect(ids.includes(id)).toBe(false)
      ids.push(id)
    })

    ids = []
    doIt(10, {}, () => {
      const id = nanoid()
      expect(ids.includes(id)).toBe(false)
      ids.push(id)
    })
  })

  test(`it allows setting joiner`, () => {
    const id = nanoid({
      joiner: `-`
    })

    expect(id.includes(`.`)).toBe(false)
    expect(id.includes(`-`)).toBe(true)
  })

  test(`it allows setting parts`, () => {
    const id = nanoid({
      parts: 10
    })

    expect(id.split(`.`).length).toBe(10)
  })

  test(`it allows adding a prefix`, () => {
    const id = nanoid({
      parts: 10,
      prefix: `utils`
    })
    expect(id.startsWith(`utils`)).toBe(true)
    expect(id.split(`.`).length).toBe(11)
  })

})
