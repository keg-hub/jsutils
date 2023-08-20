import { debounce } from '../debounce'

describe('debounce', () => {
  beforeEach(() => jest.resetAllMocks())

  // eslint-disable-next-line jest/no-done-callback
  it('should call the passed method after the correct amount of time', done => {
    const testMethod = jest.fn(() => {})
    const boundMethod = debounce(testMethod, 100)
    boundMethod()

    setTimeout(() => {
      expect(testMethod).not.toHaveBeenCalled()
    }, 99)
    setTimeout(() => {
      expect(testMethod).toHaveBeenCalled()
      done()
    }, 101)
  })

  // eslint-disable-next-line jest/no-done-callback
  it('should use 250 as default wait time when not wait time is passed', done => {
    const testMethod = jest.fn(() => {})
    const boundMethod = debounce(testMethod)
    boundMethod()

    setTimeout(() => {
      expect(testMethod).not.toHaveBeenCalled()
    }, 50)

    setTimeout(() => {
      expect(testMethod).toHaveBeenCalled()
      done()
    }, 251)
  })

  // eslint-disable-next-line jest/no-done-callback
  it('should call immediately is passed in as true', done => {
    const testMethod = jest.fn(() => {})
    const boundMethod = debounce(testMethod, 300)
    boundMethod()
    const nowMethod = debounce(testMethod, 300, true)

    setTimeout(() => {
      expect(testMethod).not.toHaveBeenCalled()
      nowMethod()
      expect(testMethod).toHaveBeenCalled()
      done()
    }, 50)
  })

  it('should not try to call the fun if a fun is not passed in', () => {
    const boundMethod = debounce(undefined)

    expect(boundMethod()).toEqual(null)
  })
})
