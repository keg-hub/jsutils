import { not } from '../not'
import { isFunc } from '../isFunc'
import { isStr } from '../../string/isStr'
import { isIp } from '../../string/isIp'

const func = () => {}
const ip = `127.0.0.1`
const ipBad = `400.10.257.01`

describe('not', () => {
  it('should return the opposite of the original', () => {
    const validFunc = isFunc(func)
    const oppFunc = not(isFunc)(func)
    expect(validFunc).toBe(!oppFunc)

    const validStr = isStr(ip)
    const oppStr = not(isStr)(ip)
    expect(validStr).toBe(!oppStr)

    const invalidIp = isIp(ipBad)
    const oppIp = not(isIp)(ipBad)
    expect(invalidIp).toBe(!oppIp)
  })

  it('should work with non-boolean responses', () => {
    const method = value => value
    const validStr = method(`test-response`)
    const oppStr = not(method)(`test-response`)
    expect(!!validStr).toBe(!oppStr)

    const validUndefined = method()
    const oppUndefined = not(method)()
    expect(!!validUndefined).toBe(!oppUndefined)
  })
})
