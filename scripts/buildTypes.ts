import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile, readFile, rm, mkdir } from 'node:fs/promises'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const typesFile = path.join(dirname, `../.d.ts`)
const typesDir = path.join(dirname, `../types`)

;(async () => {
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

          if(!isFun && !isConst) return 

          let content:string
          let name:string

          if(isConst){
            content = `export ${short}`
            name = (short.split(`:`)?.shift()?.trim() || ``).split(` `)?.pop()?.trim() || ``
          }
          else {
            content = `export ${short}`
            name = (short.split(`(`).shift()?.replace(/<.*>/, ``) || ``)
              .replace(/function/, ``)
              .replace(/<.*/, ``)
              .trim()
          }

          if(!name) return console.log(`Could not write file for ${short}`)

          await writeFile(path.join(typesDir, `${name}.d.ts`), content)
        })
      )
    })
  )
    console.log(`Finished writing type files`)
  
})()