import path from 'node:path'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { getEntries } from './getEntries'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)

const tempDir = path.join(rootDir, `./temp`)
const tempNodeDir = path.join(rootDir, `./temp/node`)
const rootIdx = path.join(tempDir, `./index.ts`)
const nodeIdx = path.join(tempNodeDir, `./index.ts`)

const nodeRef:string[] = []
const indexRef:string[] = []

const cleanTemp = async () => {
  await fs.rm(tempDir, { recursive: true, force: true })
  await fs.mkdir(tempDir, { recursive: true })
  await fs.mkdir(tempNodeDir, { recursive: true })
}

const copyToTemp = async (entries:string[]) => {
  return await Promise.all(
    entries.map(async (entry) => {
      let base:string
      let tempLoc:string

      if(entry.includes(`src/node/`)){
        base = path.basename(entry)
        tempLoc = path.join(tempNodeDir, base)
        nodeRef.push(`export * from './${path.basename(base, `.ts`)}'`)
      }
      else {
        base = path.basename(entry)
        tempLoc = path.join(tempDir, base)
        indexRef.push(`export * from './${path.basename(base, `.ts`)}'`)
      }

      await fs.cp(entry, tempLoc)
      
      return tempLoc
    })
  )
}


const genIndexes = async () => {
  await fs.writeFile(nodeIdx, `export * from './node'`)
  await fs.writeFile(rootIdx, indexRef.join(`\n`))
}

export const buildIndexes = async () => {
  await cleanTemp()
  const entries = await getEntries()
  const temp = await copyToTemp(entries)
  await genIndexes()

  return [nodeIdx, rootIdx, ...temp]
}
