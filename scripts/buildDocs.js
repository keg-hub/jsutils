const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const docsLoc = `./docs`

const cmdExec = promisify(exec)
const rootPath = path.join(__dirname, `../`)

/**
 * Executes a command in the docs directory
 * @function
 *
 * @param {string} cmd - Command to be run
 *
 * @returns {Promise} - resolves to response from cmdExec method
 */
const runCmd = async cmd => {
  return await cmdExec(cmd, { cwd: rootPath })
}

/**
 * Runs the JSdocs executable to build the docs in the docs folder
 * Same as running `rm -rf ./docs && node_modules/.bin/jsdoc -c ./configs/jsdoc.json || true`
 * @function
 *
 * @returns {void}
 */
const buildDocs = async () => {
  let exitCode = 0
  try {
    await runCmd(`rm -rf ./docs`)
    await runCmd(`./node_modules/.bin/jsdoc -c ./configs/jsdoc.json`)

    console.log(`Successfully build docs\n`)
  }
  catch (e) {
    console.error(e)
    exitCode = 1

    console.log(`Resetting docs to original state...\n`)
    await runCmd(`rm -rf ./docs`)
    await runCmd(`git checkout HEAD -- ${docsLoc}`)
  }

  process.exit(exitCode)
}

buildDocs()
