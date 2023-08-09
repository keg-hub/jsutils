const { resolvePath } = require('../resolvePath')
const os = require('os')
const homeDir = os.homedir()
const cwd = process.cwd()

describe('resolvePath', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should resolve from home directory when location starts with "~"', () => {
    expect(resolvePath(`~`)).toBe(homeDir)
    expect(resolvePath(`~/`)).toBe(homeDir)
    expect(resolvePath(`~/some/path`)).toBe(`${homeDir}/some/path`)
  })

  it('should resolve from rootDir passed in', () => {
    expect(resolvePath(`some/path`, `/custom/root1`)).toBe(
      `/custom/root1/some/path`
    )
    expect(resolvePath(`.`, `/custom/root2`)).toBe(`/custom/root2`)
    expect(resolvePath(`./`, `/custom/root2`)).toBe(`/custom/root2`)
  })

  it('should use the current working directory when no rootDir is passed', () => {
    expect(resolvePath(`some/path`)).toBe(`${cwd}/some/path`)
    expect(resolvePath(`.`)).toBe(cwd)
    expect(resolvePath(`./`)).toBe(cwd)
  })

  it('should resolve "./" paths to the rootDir', () => {
    expect(resolvePath(`./some/path`)).toBe(`${cwd}/some/path`)
    expect(resolvePath(`./`)).toBe(cwd)
  })
  
  it('should resolve "/" paths from the root of the file system', () => {
    expect(resolvePath(`/some/path`)).toBe(`/some/path`)
    expect(resolvePath(`/`)).toBe(`/`)
  })

})
