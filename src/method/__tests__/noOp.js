import { noOp } from '../noOp'
describe('noOp', () => {
  it('should do nothing', () => {
    const result = noOp()
    expect(result).toBeUndefined()
  })
})
