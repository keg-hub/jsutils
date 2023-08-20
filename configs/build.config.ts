import path from 'node:path'
import * as esbuild from 'esbuild'
import tsConfig from '../tsconfig.json'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'node:fs'
import { getEntries } from '../scripts/getEntries'
import { aliasReplace } from '../scripts/alias.plugin'
import { buildIndexes } from '../scripts/buildIndexes'

const { paths } = tsConfig.compilerOptions

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build`)
const esmdir = path.join(outdir, `esm`)
const cjsdir = path.join(outdir, `cjs`)
const esmNodedir = path.join(outdir, `esm/node`)
const cjsNodedir = path.join(outdir, `cjs/node`)
const nodeEntry = path.join(rootDir, `src/node/node.js`)

const aliases = Object.entries(paths).reduce((acc, [key, valArr]) => {
  acc[key] = `.`
  return acc
}, {} as Record<string, string>)

const opts = {
  outdir,
  minify: false,
  sourcemap: true,
  platform: `node`,
  target: [`node20`],
  entryNames: `[name]`,
  tsconfig: path.join(rootDir, `tsconfig.json`),
  plugins: [],
  entryPoints: [],
}

const esBuild = async (options: any) => {
  await esbuild
    .build({
      ...opts,
      ...options,
      entryPoints: [...opts.entryPoints, ...(options?.entryPoints || [])],
      plugins: [...opts.plugins, ...(options?.plugins || [])],
    })
    .catch(cause => {
      console.error(cause)
      process.exit(1)
    })
}

;(async () => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })

  const entries = await getEntries()

  await esBuild({
    outdir: cjsdir,
    entryPoints: entries,
    format: `cjs` as const,
    plugins: [aliasReplace(aliases)],
  })
  await esBuild({
    outdir: esmdir,
    entryPoints: entries,
    format: `esm` as const,
    plugins: [aliasReplace(aliases)],
  })

  await esBuild({
    bundle: true,
    outdir: esmNodedir,
    format: `esm` as const,
    entryPoints: [nodeEntry],
  })

  await esBuild({
    bundle: true,
    outdir: cjsNodedir,
    format: `cjs` as const,
    entryPoints: [nodeEntry],
  })

  await buildIndexes(entries)
})()
