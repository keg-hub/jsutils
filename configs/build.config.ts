import path from 'path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import { getEntries } from '../scripts/getEntries'
import {buildIndexes} from '../scripts/buildIndexes'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build`)
const esmdir = path.join(outdir, `esm`)
const cjsdir = path.join(outdir, `cjs`)
const esmNodedir = path.join(outdir, `esm/node`)
const cjsNodedir = path.join(outdir, `cjs/node`)
const nodeEntry = path.join(rootDir, `src/node/node.js`)

const loopAliases = (content:string, aliases:Record<string, string>) => {
  return Object.entries(aliases).reduce((acc, [key, val]) => {
    return acc.replaceAll(`from '${key}`, `from '${val}`)
      .replaceAll(`from "${key}/`, `from "${val}`)
      .replaceAll(`require('${key}/`, `require('${val}`)
      .replaceAll(`require("${key}/`, `require("${val}`)
  }, content)
}

const aliasReplace = (aliases:Record<string, string>) => {
  return {
    name: 'example',
    setup(build) {
      build.onLoad({ filter: /\.*/ }, async (args) => {
        const text = await fs.readFile(args.path, 'utf8')
        return {
          contents: loopAliases(text, aliases),
        }
      })
    }
  }
}

const opts = {
  // bundle: true,
  minify: false,
  sourcemap: true,
  treeShaking: true,
  entryNames: `[name]`,
  assetNames: `[name]`,
  platform: `node` as const,
  logLevel: `silent` as const,
  target: [`node20`],
  plugins: [
    aliasReplace({
      [`@array/`]: `./`,
      [`@boolean/`]: `./`,
      [`@collection/`]: `./`,
      [`@dom/`]: `./`,
      [`@ext/`]: `./`,
      [`@log/`]: `./`,
      [`@method/`]: `./`,
      [`@node/`]: `./`,
      [`@number/`]: `./`,
      [`@object/`]: `./`,
      [`@promise/`]: `./`,
      [`@regex/`]: `./`,
      [`@string/`]: `./`,
      [`@url/`]: `./`,
      [`@validation/`]: `./`,
    }),
  ],
}

const buildEsm = async (options:any, type:string) => {
  // Build the files with esbuild
  await esbuild.build({...opts, ...options})
  .catch((cause) => {
    console.error(cause)
    process.exit(1)
  })
  .then(result => result?.errors?.length
    ? console.error(result?.errors)
    : console.log(`${type} ESM build completed`)
  )
}


const buildCjs = async (options:any, type:string) => {
  // Build the files with esbuild
  await esbuild.build({...opts, ...options})
  .catch((cause) => {
    console.error(cause)
    process.exit(1)
  })
  .then(result => result?.errors?.length
    ? console.error(result?.errors)
    : console.log(`${type} CJS build completed`)
  )
}


;(async () => {
  const entries = await getEntries()
  const nodeEntries = [nodeEntry]
  const nonNode = entries.filter((item) => {
    if(item.includes(`/node`)){
      nodeEntries.push(item)
      return false
    }

    return true
  })

  const noNodeEntries = [...nonNode]

  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })

  await buildEsm({
    outdir: esmdir,
    format: `esm` as const,
    entryPoints: noNodeEntries,
  }, `Index`)

  await buildCjs({
    outdir: cjsdir,
    format: `cjs` as const,
    entryPoints: noNodeEntries,
  }, `Index`)

  await buildEsm({
    outdir: esmNodedir,
    format: `esm` as const,
    entryPoints: nodeEntries,
  }, `Node`)

  await buildCjs({
    outdir: cjsNodedir,
    format: `cjs` as const,
    entryPoints: nodeEntries,
  }, `Node`)
  
  await buildIndexes(entries)

})()


