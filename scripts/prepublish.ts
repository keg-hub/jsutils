import path from 'node:path'
import { glob } from 'glob'
import { cp } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `../`)
const typesDir = path.join(dirname, `../types`)
const typesIdx = path.join(dirname, `../src/index.d.ts`)
const typesIdxOut = path.join(dirname, `../.d.ts`)


;(async () => {

  const typeFiles = await glob(`**/*.d.ts`, {
    nodir: true,
    cwd: typesDir,
  })

  await cp(typesIdx, typesIdxOut)
  await Promise.all(typeFiles.map(async file => await cp(path.join(typesDir, file), path.join(rootDir, file))))

  console.log(`Copied type files to root`)

})()