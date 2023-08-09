const { isArr } = require('../../array/isArr')
const Method = require('../')

const promiseHelper = isValid =>
  new Promise((res, rej) => {
    setTimeout(() => {
      isValid ? res(`Promise Valid`) : rej(new Error(`Promise Error`))
    }, 100)
  })

describe('limbo', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should return an array with the length of 2', async () => {
    const response = await Method.limbo(promiseHelper(true))
    expect(typeof response).toBe('object')
    expect(isArr(response)).toBe(true)
    expect(response.length).toBe(2)
  })

  it('should return an error for first slot when the promise is rejected', async () => {
    const [err] = await Method.limbo(promiseHelper(false))
    expect(err instanceof Error).toBe(true)
    expect(err.message).toEqual(`Promise Error`)
  })

  it('should return null for first slot when an error is not throw', async () => {
    const [err] = await Method.limbo(promiseHelper(true))
    expect(err).toBe(null)
  })

  it('should return promise response for second slot when error is not throw', async () => {
    // eslint-disable-next-line no-unused-vars
    const [ err, data ] = await Method.limbo(promiseHelper(true))
    expect(data).toEqual(`Promise Valid`)
  })

  it('should return an error for first slot when no promise is passed in', async () => {
    const [err] = await Method.limbo()
    expect(err instanceof Error).toBe(true)
  })

  it('should return an error for first slot when an error is thrown', async () => {
    const [err] = await Method.limbo()
    expect(err instanceof Error).toBe(true)
  })

  it('should return an object for second slot when non-promise and true are passed as arguments', async () => {
    const [err, data] = await Method.limbo(undefined, true)
    expect(typeof data).toBe(`object`)
  })

  it('should return an object in second slot on error and true is passed as 2nd argument', async () => {
    // eslint-disable-next-line no-unused-vars
    const [err, data] = await Method.limbo(promiseHelper(false), true)
    expect(typeof data).toBe(`object`)
  })

})
