import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'util'
import { exec } from 'child_process'
const docsLoc = `./docs`

const dirname = path.dirname(fileURLToPath(import.meta.url))
const cmdExec = promisify(exec)
const rootPath = path.join(dirname, `../`)

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
    console.log(`Building docs...\n`)
    await runCmd(`git checkout main`)
    await runCmd(`git checkout -B js-utils-docs`)
    await runCmd(`rm -rf ./docs`)

    await runCmd(`./node_modules/.bin/jsdoc -c ./configs/jsdoc.json`)
    console.log(`Successfully built docs\n`)

    await runCmd(`git add ./docs`)
    await runCmd(`git commit -m "Build docs"`)
    await runCmd(`git push origin js-utils-docs --force`)
    console.log(`Successfully pushed changes to remote\n`)

    await runCmd(`git checkout main`)
    await runCmd(`git branch -D js-utils-docs`)
    console.log(`Finished building docs!\n`)
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
