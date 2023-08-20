import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getEntries } from './getEntries'
import { writeFile } from 'node:fs/promises'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `../`)
const buildDir = path.join(rootDir, `./build`)
const cjsIdx = path.join(buildDir, `./cjs/index.js`)
const esmIdx = path.join(buildDir, `./esm/index.js`)

const buildJSIdx = async (ents?: string[]) => {
  const entries = ents || (await getEntries())

  const esmItems: string[] = []
  const cjsItems: string[] = []

  entries.forEach(ent => {
    const name = path.basename(ent, `.ts`)
    cjsItems.push(`  ...require("./${name}"),`)
    esmItems.push(`export * from "./${name}"`)
  })

  await writeFile(cjsIdx, `module.exports = {\n${cjsItems.join(`\n`)}\n}\n`)
  await writeFile(esmIdx, esmItems.join(`\n`))
}

export const buildIndexes = async (ents?: string[]) => {
  await buildJSIdx(ents)
}
