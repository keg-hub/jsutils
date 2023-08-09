const Arr = require('../')

describe('intersect', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should return matching items in an array', () => {
    expect(Arr.intersect([1,2,3,4], [4,1])).toEqual([1,4])
  })
  
  it('should return an empty array when not items match', () => {
    expect(Arr.intersect([1,2,3,4], [5,6,7,8])).toEqual([])
  })

  it('should return an empty array when one of the arguments is not an array', () => {
    expect(Arr.intersect([1,2,3,4], false)).toEqual([])
    expect(Arr.intersect({}, [1,2,3,4])).toEqual([])
  })

  it('should work with all primitive types', () => {
    const obj = {foo: `bar`}
    const foo = true
    const bar = []
    const num = 1
    const str = `test`

    expect(Arr.intersect([obj, foo, bar, num, str], [obj, num])).toEqual([obj, num])
    expect(Arr.intersect([obj, foo, num, str], [obj, bar, str])).toEqual([obj, str])
    expect(Arr.intersect([bar, foo], [obj, foo, bar, num, str])).toEqual([bar, foo])
  })

})
