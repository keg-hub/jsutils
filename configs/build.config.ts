import path from 'path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const entryFile = path.join(rootDir, `index.ts`)
const outdir = path.join(rootDir, `dist`)
const outfile = path.join(outdir, `index.js`)

const build = async () => {
  // Build the files with esbuild
  await esbuild.build({
    outfile,
    bundle: true,
    minify: false,
    sourcemap: true,
    platform: `node`,
    target: [`node20`],
    entryPoints: [entryFile],
    tsconfig: path.join(rootDir, `tsconfig.build.json`),
  })
  .catch(() => process.exit(1))
}


;(async () => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  await build()
})()


