const Obj = require('../')

describe('mapObj', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should call the callback on all object properties', () => {
    const obj = {
      test: 'I should freeze',
      sub: [ 1, 2, 3 ],
      data: { test: 'I should freeze' },
    }
    const keys = []
    const callBack = jest.fn((key, value) => keys.push(key))
    Obj.mapObj(obj, callBack)

    expect(keys.length).toEqual(3)
    expect(keys.indexOf('test')).not.toEqual(-1)
    expect(keys.indexOf('sub')).not.toEqual(-1)
    expect(keys.indexOf('data')).not.toEqual(-1)
    expect(callBack).toHaveBeenCalledTimes(3)
  })

  it('should return array of values returned from the callback', () => {
    const obj = {
      test: 'I should freeze',
      sub: [ 1, 2, 3 ],
      data: { test: 'I should freeze' },
    }
    const callBack = jest.fn((key, value) => key)
    const keys = Obj.mapObj(obj, callBack)

    expect(keys.length).toEqual(3)
    expect(keys.indexOf('test')).not.toEqual(-1)
    expect(keys.indexOf('sub')).not.toEqual(-1)
    expect(keys.indexOf('data')).not.toEqual(-1)
    expect(callBack).toHaveBeenCalledTimes(3)
  })

  it('should return array of entries if no callback is passed', () => {
    const obj = {
      test: 'I should freeze',
      sub: [ 1, 2, 3 ],
      data: { test: 'I should freeze' },
    }
    const entries = Obj.mapObj(obj)

    expect(entries.length).toEqual(3)
    entries.map(([ key, val ]) => expect(obj[key]).toEqual(val))
  })

  it('should return an empty array it the first argument is not an object', () => {
    const entries = Obj.mapObj(null)
    expect(entries.length).toEqual(0)
    expect(Array.isArray(entries)).toBe(true)
  })
})
