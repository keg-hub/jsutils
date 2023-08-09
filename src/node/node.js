module.exports = {
  ...require('./findProc'),
  ...require('./tryRequire'),
  ...require('./loadModule'),
  ...require('./resolvePath'),
  ...require('./inDocker'),
}
