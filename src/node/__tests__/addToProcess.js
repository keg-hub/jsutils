const { addToProcess } = require('../addToProcess')

describe('addToProcess', () => {
  afterEach(() => {
    delete process.env.ADD_TO_PROC_TEST
    delete process.env.ANOTHER_ADD_ENV
  })

  it('should add the passed in envs to the current process', () => {
    expect(process.env.ADD_TO_PROC_TEST).toBe(undefined)
    expect(process.env.ANOTHER_ADD_ENV).toBe(undefined)
    addToProcess({
      ADD_TO_PROC_TEST: '1234',
      ANOTHER_ADD_ENV: 1234,
    })
    expect(process.env.ADD_TO_PROC_TEST).toBe('1234')
    expect(process.env.ANOTHER_ADD_ENV).toBe('1234')
  })

  it('should not add the env, if the value does not exist', () => {
    expect(process.env.ADD_TO_PROC_TEST).toBe(undefined)
    addToProcess({
      ADD_TO_PROC_TEST: null,
    })
    expect(process.env.ADD_TO_PROC_TEST).not.toBe(null)
  })

  it('should not add the env, if the env already exists', () => {
    process.env.ADD_TO_PROC_TEST = '4321'
    expect(process.env.ADD_TO_PROC_TEST).toBe('4321')
    addToProcess({
      ADD_TO_PROC_TEST: 'test-override',
    })
    expect(process.env.ADD_TO_PROC_TEST).toBe('4321')
  })

  it('should add the env, if the env already exists and force option is passed', () => {
    process.env.ADD_TO_PROC_TEST = '4321'
    expect(process.env.ADD_TO_PROC_TEST).toBe('4321')
    addToProcess(
      {
        ADD_TO_PROC_TEST: 'test-override',
      },
      { force: true }
    )
    expect(process.env.ADD_TO_PROC_TEST).toBe('test-override')
  })
})
