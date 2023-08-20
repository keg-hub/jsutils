const fs = {
  statSync: jest.fn(() => {
    return {}
  }),
  readFileSync: jest.fn(() => {
    return 'docker'
  }),
}

module.exports = {
  fs,
}
