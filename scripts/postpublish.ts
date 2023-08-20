import path from 'node:path'
import { glob } from 'glob'
import { rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `../`)
const typesDir = path.join(dirname, `../types`)


;(async () => {

  const typeFiles = await glob(`*.d.ts`, {
    nodir: true,
    cwd: rootDir,
    absolute: true,
  })

  await Promise.all(typeFiles.map(async file => await rm(file, { force: true })))
  console.log(`Removed type files from root`)

})()