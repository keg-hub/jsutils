import path from 'path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import { getEntries } from '../scripts/getEntries'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build`)
const esmdir = path.join(outdir, `esm`)
const cjsdir = path.join(outdir, `cjs`)

const opts = {
  bundle: true,
  minify: false,
  sourcemap: true,
  platform: `node` as const,
  target: [`node20`],
}

const buildEsm = async (entries:string[]) => {
  // Build the files with esbuild
  await esbuild.build({
    ...opts,
    outdir: esmdir,
    treeShaking: true,
    assetNames: `[name]`,
    entryPoints: entries,
    format: `esm` as const,
  })
  .catch(() => process.exit(1))
}


const buildCjs = async (entries:string[]) => {
  // Build the files with esbuild
  await esbuild.build({
    ...opts,
    outdir: cjsdir,
    treeShaking: true,
    assetNames: `[name]`,
    entryPoints: entries,
    format: `cjs` as const,
  })
  .catch(() => process.exit(1))
}


;(async () => {
  const entries = await getEntries()
  
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  await buildEsm(entries)
})()


