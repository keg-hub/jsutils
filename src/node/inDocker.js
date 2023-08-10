/** @module Node */

const fs = require('fs')
let inContainer

/**
 * Wraps a method with try catch, and returns false when it throws
 * @param {Function} cb - Method to wrap try catch around
 *
 * @returns {Boolean} true if the cb returns a truthy response
 */
const tryCatch = cb => {
  try {
    return Boolean(cb())
  } catch (_) {
    return false
  }
}

/**
 * Checks if the /.dockerenv file exists
 *
 * @returns {Boolean} true if the check for /.dockerenv does not throw
 */
const dockEnv = () => fs.statSync('/.dockerenv') || true

/**
 * Checks if docker is in the process group
 *
 * @returns {Boolean} true if the docker group exists
 */
const docGroup = () =>
  fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker')

/**
 * Checks if the current process is running in a docker container
 *
 * @returns {Boolean} true if running in a docker container
 */
const inDocker = () => {
  inContainer === undefined &&
    (inContainer = tryCatch(dockEnv) || tryCatch(docGroup))

  return inContainer
}

module.exports = {
  inDocker,
}
