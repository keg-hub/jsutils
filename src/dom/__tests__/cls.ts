const Dom = require('../')

describe('checkCall', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should format an object', () => {
    expect(Dom.cls({ class1: true, class2: false })).toBe(`class1`)
    expect(Dom.cls({ class1: true, class2: true })).toBe(`class1 class2`)
  })

  it('should format an array', () => {
    let class2Active = false
    expect(Dom.cls([`class1`, class2Active && `class2`])).toBe(`class1`)
    class2Active = true
    expect(Dom.cls([`class1`, class2Active && `class2`])).toBe(`class1 class2`)
  })

  it('should format a string', () => {
    expect(Dom.cls(`class1`)).toBe(`class1`)
    expect(Dom.cls(`class1 class2`)).toBe(`class1 class2`)
  })

  it('should ignore numbers', () => {
    expect(Dom.cls(`class1`, 1234)).toBe(`class1`)
    expect(Dom.cls(1234, `class1 class2`)).toBe(`class1 class2`)
  })

  it('should trim the returned string', () => {
    expect(Dom.cls(` class1  `)).toBe(`class1`)
    expect(Dom.cls([` class1  `, `   class2  `, `class3  `])).toBe(
      `class1 class2 class3`
    )
    expect(Dom.cls({ [`  class1`]: true })).toBe(`class1`)
  })

  it('should format multiple different passed in items', () => {
    expect(Dom.cls(`class1`, `class2`, [`class3`], { class4: true })).toBe(
      `class1 class2 class3 class4`
    )
  })

  it('should work recursivly', () => {
    expect(
      Dom.cls(
        [
          [`class1`, `class2`],
          [`class3`, { sub: [`class4`] }],
        ],
        { class5: true, sub: [`class6`] }
      )
    ).toBe(`class1 class2 class3 class4 class5 class6`)
  })
})
