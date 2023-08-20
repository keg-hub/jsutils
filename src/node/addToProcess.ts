/** @module Node */

import { exists } from '../ext/exists'
import { emptyObj } from '../ext/noOps'

/**
 * Loop over the passed in ENVs, and add them to the current process
 * Add them to the process.env if they don't already exist
 * @param {Object} addEnvs - Envs to add to the current process
 * @param {Object} options - Configure out the envs are added
 * @param {Object} options.force - Force add the env, even if it already exists
 *
 * @returns {Void}
 */
export const addToProcess = (addEnvs: any, options:{force?: boolean}=emptyObj): void => {
  const { force } = options

  Object.entries(addEnvs).map(([ key, value ]) => {
    exists(value)
      && (!exists(process.env[key]) || force)
      // @ts-ignore
      && (process.env[key] = value)
  })
}

