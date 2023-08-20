const Obj = require('../')

describe('hashObj', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should return a hash strign for the passed in object or array', () => {
    const foo = { a: 1, b: 2, c: 3 }
    const bar = [1, 2, 3, 4]

    expect(Obj.hashObj(foo)).toBe(`069c5a42`)
    expect(Obj.hashObj(bar)).toBe(`54d79754`)
  })

  it('should create a consistent hash for objects with the same values and keys', () => {
    const foo = { a: 1, b: 2, c: 3 }
    const oof = { c: 3, b: 2, a: 1 }
    const bar = [1, 2, 3, 4]
    const rab = [1, 2, 3, 4]

    expect(Obj.hashObj(foo)).toBe(Obj.hashObj(oof))
    expect(Obj.hashObj(bar)).toBe(Obj.hashObj(rab))
  })

  it('should not create the same has for different values or keys', () => {
    const foo = { a: 1, b: 2, c: 3 }
    const oof = { c: 4, b: 2, a: 1 }
    const bar = [1, 2, 3, 4]
    const rab = [4, 3, 2, 1]

    expect(Obj.hashObj(foo)).not.toBe(Obj.hashObj(oof))
    expect(Obj.hashObj(bar)).not.toBe(Obj.hashObj(rab))
  })
})
