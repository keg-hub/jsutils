const Str = require('..')

describe('isIp', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should check passed in data is an ip address', () => {
    const amValid1 = '0.0.0.0'
    const amValid2 = '127.0.0.1'
    const notValid1 = {}
    const notValid2 = '300.30.10.5'
    const notValid3 = '127.0.0.0.1'

    expect(Str.isIp(amValid1)).toEqual(true)
    expect(Str.isIp(amValid2)).toEqual(true)
    expect(Str.isIp(notValid1)).toEqual(false)
    expect(Str.isIp(notValid2)).toEqual(false)
    expect(Str.isIp(notValid3)).toEqual(false)
  })
})
