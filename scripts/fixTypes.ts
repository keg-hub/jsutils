import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile, rename } from 'node:fs/promises'

const GlobJSExts = [`d.ts`, `d.ts.map`]
const exts = GlobJSExts.join(`,`)
const GlobJSFiles = `**/*.{${exts}}`

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `../`)
const esmDir = path.join(rootDir, `./build/esm`)
const typeIdx = path.join(esmDir, `index.d.ts`)

export const getTypes = async () => {
  return await glob(GlobJSFiles, {
    cwd: esmDir,
    nodir: true,
    absolute: true,
    ignore: [`**/*.js`, `**/node/**`],
  })
}
;(async () => {
  const typeFiles = await getTypes()
  const typeItems: string[] = []
  await Promise.all(
    typeFiles.map(async loc => {
      await rename(loc, path.resolve(esmDir, path.basename(loc)))
      if (loc.endsWith(`d.ts.map`) || loc.includes(`index.d`)) return

      typeItems.push(`export * from "./${path.basename(loc, `.d.ts`)}"`)
    })
  )

  await writeFile(typeIdx, typeItems.join(`\n`))
})()
