import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile, rename, copyFile } from 'node:fs/promises'

const GlobJSExts = [`d.ts`, `d.ts.map`]
const exts = GlobJSExts.join(`,`)
const GlobJSFiles = `**/*.{${exts}}`

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `../`)
const typesDir = path.join(rootDir, `./build/types`)
const esmDir = path.join(rootDir, `./build/esm`)
const esmIdx = path.join(esmDir, `index.d.ts`)
const cjsDir = path.join(rootDir, `./build/cjs`)
const cjsIdx = path.join(cjsDir, `index.d.ts`)

export const getTypes = async () => {
  return await glob(GlobJSFiles, {
    cwd: esmDir,
    nodir: true,
    absolute: true,
    ignore: [`**/*.js`, `**/node/**`],
  })
}

const copyType = async (loc:string) => {
  const name = path.basename(loc)
  const esmLoc = path.resolve(esmDir, name)
  await rename(loc, esmLoc)

  const cjsLoc = path.resolve(cjsDir, name)
  await copyFile(esmLoc, cjsLoc)
}

const generateIndexes = async () => {
  const typeFiles = await getTypes()
  const typeItems: string[] = []
  await Promise.all(
    typeFiles.map(async loc => {
      const isIdx = loc.includes(`index.d`)
      
      !isIdx && await copyType(loc)

      if (loc.endsWith(`d.ts.map`) || isIdx) return

      typeItems.push(`export * from "./${path.basename(loc, `.d.ts`)}"`)
    })
  )

  const joined = typeItems.join(`\n`)
  await writeFile(esmIdx, joined)
  await writeFile(cjsIdx, joined)
}

;(async () => await generateIndexes())()
