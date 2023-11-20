import path from 'node:path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'node:fs'
import { buildIndexes } from '../scripts/buildIndexes'



const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const tempDir = path.join(rootDir, `./temp`)
const outdir = path.join(rootDir, `build`)
const esmdir = path.join(outdir, `esm`)
const cjsdir = path.join(outdir, `cjs`)


export default defineConfig(async (options) => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  const entries = await buildIndexes()

  return {
    entry: entries,
    outDir: cjsdir,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    legacyOutput: true,
    experimentalDts: true,
    format: [`esm`, `cjs`],
    async onSuccess() {
      await fs.rename(path.join(cjsdir, `esm`), esmdir)
      await fs.rm(tempDir, { recursive: true, force: true })
    },
  }

})

