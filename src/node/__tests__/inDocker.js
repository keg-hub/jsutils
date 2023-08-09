const { inDocker } = require('../inDocker')

describe('inDocker', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should return false if the process is not in docker', () => {
    expect(inDocker()).toBe(false)
  })

  it('should return true if the process is in docker', () => {
    // eslint-disable-next-line jest/no-mocks-import
    const { fs } = require('../__mocks__/fs')
    jest.setMock('fs', fs)
    expect(inDocker()).toBe(false)
  })
})
