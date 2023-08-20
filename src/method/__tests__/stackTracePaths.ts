const { stackTracePaths } = require('../stackTracePaths')

const currentFile = module.filename

describe('stackTracePaths', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should include the current test file in return paths', () => {
    const paths = stackTracePaths()
    expect(paths.includes(currentFile)).toBe(true)
  })

  it('should use the default filters when no filters are passed', () => {
    const paths = stackTracePaths()
    expect(paths.length).toBe(1)
  })

  it('should allow overwriting the default filters with an array', () => {
    const paths = stackTracePaths([ `stackTracePaths.js`, `node:`, `/jest` ])
    expect(paths.length).toBe(0)
  })

  it('should allow overwriting the default filters with a filter function', () => {
    let checkJest
    const filterFunc = loc => {
      if (loc.includes('node_modules/jest')) checkJest = true
      return loc !== currentFile
    }

    const paths = stackTracePaths(filterFunc)
    expect(paths.length).toBe(1)
    expect(paths.includes(currentFile)).toBe(true)
    expect(checkJest).toBe(true)
  })
})
