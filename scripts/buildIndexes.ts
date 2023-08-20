import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getEntries, getTypeEntries } from './getEntries'
import { writeFile, cp, mkdir } from 'node:fs/promises'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `../`)
const buildDir = path.join(rootDir, `./build`)
const cjsIdx = path.join(buildDir, `./cjs/index.js`)
const esmIdx = path.join(buildDir, `./esm/index.js`)
const typesBuildDir = path.join(buildDir, `./types`)

const typesIgnore = [
  `noOps`
]


const buildJSIdx = async (ents?:string[]) => {
  const entries = ents ||await getEntries()

  const esmItems:string[] = []
  const cjsItems:string[] = []
  
  entries.forEach(ent => {
    const name = path.basename(ent)
    cjsItems.push(`  ...require("./${name}"),`)
    esmItems.push(`export * from "./${name}"`)
  })

  await writeFile(cjsIdx, `module.exports = {\n${cjsItems.join(`\n`)}\n}\n`)
  await writeFile(esmIdx, esmItems.join(`\n`))
}

export const buildIndexes = async (ents?:string[], tys?:string[]) => {
  await buildJSIdx(ents)
}
