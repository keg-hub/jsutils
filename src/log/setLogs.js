/** @module Log */

export let SHOW_LOGS
export let METH_DEF = 'dir'
export let PREFIX = 'type'
export const LOG_TYPES = ['error', 'info', 'log', 'dir', 'warn']
export const isTest = process.env.NODE_ENV === 'test'

/**
 * Turns logs on || off.
 * <br/>Set the default log method.
 * <br/>Add a prefix to all log message
 * @example
 * setLogs(true, 'dir', '[ DEV MODE ]')
 * @function
 * @param {Boolean} log - log values
 * @param {String} [methDef] - default log method
 * @param {String} [prefix] - string to add to all logs
 * @return { void }
 */
export const setLogs = (log, methDef, prefix) => {
  SHOW_LOGS = log
  METH_DEF = methDef || METH_DEF || 'log'
  PREFIX = prefix || PREFIX || 'type'
}

/**
 * Resets log settings to default
 * @example
 * resetLogs()
 * // Resets settings set from the `setLogs method`
 * @function
 * @return { void }
 */
export const logsReset = () => {
  SHOW_LOGS = undefined
  METH_DEF = 'log'
  PREFIX = 'type'
}

/**
 * Logs a string to the inspector, uses the last argument to determine the log type
 * @example
 * logData('data to log', 'error')
 * // Will call console.error('data to log')
 * @function
 * @param {Array} args - to be passed to the log call
 * @return { void }
 */
export const logFun = (...args) => {
  if (!args.length) return

  let type = args.length === 1 ? METH_DEF : args.pop()
  if (!SHOW_LOGS && type !== 'error') return
  else if (typeof args[0] === 'string') {
    if (PREFIX === 'type') args[0] = `[ ${type.toUpperCase()} ] ${args[0]}`
    else if (PREFIX) args[0] = `${PREFIX} ${args[0]}`
  }

  LOG_TYPES.indexOf(type) !== -1
    ? console[type](...args)
    : console[METH_DEF](...args, type)
}

export const showLogs = () => SHOW_LOGS
