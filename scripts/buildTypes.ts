import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile, readFile, rm, mkdir } from 'node:fs/promises'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const typesFile = path.join(dirname, `../src/index.d.ts`)
const typesDir = path.join(dirname, `../types`)

const typesExports = [
  `noOpObj`,
  `noPropObj`,
  `emptyObj`,
  `noPropArr`,
  `noOpArr`,
  `emptyArr`,
]

export const ignoreTypes = [
  `not`
]

const checkForType = (line:string) => {
  return line.startsWith(`type`) && typesExports.find(type => line.includes(type))
}

export const buildTypes = async () => {
  await rm(typesDir, { recursive: true, force: true })
  await mkdir(typesDir, { recursive: true })
  
  const contents = await readFile(typesFile, { encoding: 'utf8' });
  await Promise.all(
    contents.split(`/**`).map(async (item) => {
      await Promise.all(
        item.split(`*/`).map(async (line) => {

          const short = line.trim()

          const isConst = short.startsWith(`const`)
          const isFun = short.startsWith(`function`)
          const isType = checkForType(short)

          if(!isFun && !isConst && !isType) return 

          let content:string
          let name:string

          if(isConst){
            content = `export ${short}`
            name = (short.split(`:`)?.shift()?.trim() || ``).split(` `)?.pop()?.trim() || ``
          }

          else if(isType){
            content = `export ${short}`
            name = (short.split(`\n`)?.shift() || ``).replace(/type/, ``)
              .replace(/<.*/, ``)
              .trim()
          }
          else {
            content = short.split(`;\n`).reduce((acc, line) => {
              const trim = line.trim()

              trim.startsWith(`function`)
                && acc.push(`export ${trim.trim()}`)
              trim.startsWith(`type`)
                && acc.push(`export ${trim.trim()}`)

              trim.startsWith(`const`)
                && acc.push(`export ${trim.trim()}`)

              return acc
            }, [] as string[]).join(`;\n`)

            name = ((short.split(`\n`)?.shift() || ``).split(`(`).shift()?.replace(/<.*>/, ``) || ``)
              .replace(/function/, ``)
              .replace(/<.*/, ``)
              .trim()
          }
          
          if(ignoreTypes.includes(name)) return

          if(!name) return console.log(`Could not write file for ${short}`)

          await writeFile(path.join(typesDir, `${name}.d.ts`), content)
        })
      )
    })
  )
  console.log(`Finished writing type files`)
}

buildTypes()