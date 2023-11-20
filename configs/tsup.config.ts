import path from 'node:path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'node:fs'
import { getEntries } from '../scripts/getEntries'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build`)
const esmdir = path.join(outdir, `esm`)
const cjsdir = path.join(outdir, `cjs`)
const nodeEntry = path.join(rootDir, `src/node/node.js`)
const indexEntry = path.join(rootDir, `src/index.ts`)

export default defineConfig(async (options) => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  const entries = await getEntries()

  return {
    dts: true,
    entry: [
      nodeEntry,
      indexEntry,
      ...entries
    ],
    outDir: cjsdir,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    legacyOutput: true,
    format: [`esm`, `cjs`],
    async onSuccess() {
      await fs.rename(path.join(cjsdir, `esm`), esmdir)
    },
  }

})

