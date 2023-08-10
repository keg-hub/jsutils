const os = require('os')
const orgPlatform = process.platform
const platform = os.platform().toLowerCase()
jest.setMock('os', {
  platform: () => (process.platform ? platform : `test-os`),
})
const osMap = {
  lin: [`linux`],
  mac: [`darwin`],
  win: [`win32`, `win64`],
}

const { getOS } = require('../getOS')

describe('getOS', () => {
  const oldProc = global.process

  beforeAll(() => {
    global.process = {
      ...oldProc,
      platform: oldProc.platform,
      listeners: oldProc.listeners.bind(oldProc),
    }
  })

  beforeEach(() => jest.resetAllMocks())

  afterAll(() => {
    global.process = oldProc
  })

  it('should return the correct OS', () => {
    const foudnOs = getOS()
    const possiable = osMap[foudnOs]
    expect(possiable.includes(platform)).toBe(true)
  })

  it('should return mac when OS is darwin', () => {
    process.platform = `darwin`
    expect(getOS()).toBe('mac')

    process.platform = orgPlatform
  })

  it('should return win when OS is win32 or win64', () => {
    process.platform = `win32`
    expect(getOS()).toBe('win')
    process.platform = `win64`
    expect(getOS()).toBe('win')

    process.platform = orgPlatform
  })

  it('should return lin when OS is linux', () => {
    process.platform = `linux`
    expect(getOS()).toBe('lin')

    process.platform = orgPlatform
  })

  it('should return false when no match is found', () => {
    process.platform = undefined
    expect(getOS()).toBe(false)

    process.platform = orgPlatform
  })
})
