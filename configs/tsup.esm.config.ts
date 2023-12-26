import path from 'node:path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'node:fs'
import { buildIndexes } from '../scripts/buildIndexes'



const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build/esm`)


export default defineConfig(async (options) => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  const entries = await buildIndexes()

  return {
    dts: true,
    entry: entries,
    outDir: outdir,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    format: [`esm`]
  }

})

