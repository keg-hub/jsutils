const Coll = require('../')

describe('get', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should NOT modify the traversed path upon failure', () => {
    const obj = {
      foo: 123,
      data: 'Hello',
    }
    const path = [ 'data', 'path2' ]

    // path2 doesn't exist, should return fallback value
    expect(Coll.get(obj, path, 0) === 0).toBe(true)
    // traversed path should keep its value
    expect(obj.foo).toEqual(123)
    expect(obj.data).toEqual('Hello')

    const obj2 = {
      foo: 123,
      data: {
        count: 100,
      },
    }
    const path2 = [ 'data', 'count', 'toes' ]

    expect(Coll.get(obj2, path2, 0) === 0).toBe(true)
    // traversed path should keep its value
    expect(obj2.foo).toEqual(123)
    expect(obj2.data.count).toEqual(100)
  })

  it('should get a value on an object', () => {
    const getObj = { data: [{ foo: 'duper' }] }
    const path = 'data'

    expect(Coll.get(getObj, path) === getObj.data).toBe(true)
  })

  it('should get a deeply nested value on an object', () => {
    const getObj = { data: [{ foo: 'duper' }] }
    const path = 'data.0.foo'

    expect(Coll.get(getObj, path) === 'duper').toBe(true)
  })

  it('should return undefined of the value is not found', () => {
    const getObj = { data: [{ foo: 'duper' }] }
    const path = 'data.0.duper'

    expect(Coll.get(getObj, path) === undefined).toBe(true)
  })

  it('should handle arrays as the root object', () => {
    const getObj = [{ foo: 'duper' }]
    const path = '0.foo'

    expect(Coll.get(getObj, path) === 'duper').toBe(true)
  })

  it('should handle functions in the object path', () => {
    const foo = () => {}
    foo.boo = 'duper'
    const getObj = [{ foo }]
    const path = '0.foo.boo'

    expect(Coll.get(getObj, path) === 'duper').toBe(true)
  })

  it('should handle array brackets in in the object path', () => {
    const foo = () => {}
    foo.boo = 'duper'
    foo.doo = [ 1, 2, { first: 'last' }]
    const getObj = [{ foo }]

    expect(Coll.get(getObj, '[0].foo.boo') === 'duper').toBe(true)
    expect(Coll.get(getObj, '0.foo.doo.[2].first') === 'last').toBe(true)
  })

  it('should return a fallback when get value does not exist', () => {
    const getObj = { data: [{ foo: 'duper' }] }
    const path = 'data.0.duper'

    expect(Coll.get(getObj, path, 'deep_fallback') === 'deep_fallback').toBe(
      true
    )
  })

  it('should return a fallback when a value in the path does not exist', () => {
    const getObj = { data: [{ exists: 'I Exist!' }] }
    const path = 'data.1.test'

    expect(
      Coll.get(getObj, path, 'shallow_fallback') === 'shallow_fallback'
    ).toBe(true)
  })

  it('should not throw when passed in value is undefined', () => {
    const path = 'data.1.test'

    expect(() => {
      Coll.get(undefined, path, 'shallow_fallback') === 'shallow_fallback'
    }).not.toThrow()
  })

  it('should not throw when passed in path is undefined', () => {
    expect(() => {
      Coll.get(undefined, undefined, 'shallow_fallback') === 'shallow_fallback'
    }).not.toThrow()
  })

  it('should return undefined when no arguments is passed', () => {
    expect(Coll.get() === undefined).toBe(true)
  })

  it('should return undefined when value is not found', () => {
    const path = 'data.1.test'
    const item = Coll.get({ data: {} }, path)
    expect(item).toBe(undefined)
  })
})
