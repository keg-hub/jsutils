const Obj = require('../')

describe('transformKeys', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should transform only the keys defined in the second argument', () => {
    const resp = Obj.transformKeys({my_key: `1234`, other_key: `4321`}, {my_key: `myKey`})
    expect(resp).toEqual({ myKey: `1234`, other_key: `4321` })
  })

  it('should only include transformed keys in the response when opts.strict is true', () => {
    const opts = { strict: true }
    const resp = Obj.transformKeys({my_key: `1234`, other_key: `4321`}, {my_key: `myKey`}, opts)
    expect(resp).toEqual({ myKey: `1234` })
  })

  it('should not transform any keys when second argument is not defined', () => {
    const obj = {my_key: `1234`, other_key: `4321`}
    const resp = Obj.transformKeys(obj)
    expect(resp).toEqual(obj)
  })

  it('should return empty object when when second argument is not defined and strict is true', () => {
    const obj = {my_key: `1234`, other_key: `4321`}
    const resp = Obj.transformKeys(obj, undefined, {strict: true })
    expect(resp).not.toEqual(obj)
    expect(resp).toEqual({})
  })

})
