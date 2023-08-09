import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(dirname, `../src`)

export const GlobJSExts = [
  `js`,
  `cjs`,
  `mjs`,
  `ts`,
  `cts`,
  `mts`
]

export const GlobJSFiles = `**/*.{${GlobJSExts.join(',')}}`

export const getEntries = async () => {
  return await glob(GlobJSFiles, {
    cwd: srcDir,
    nodir: true,
    absolute: true,
    ignore: [
      `/node_modules/`,
      `\\.pnp\\.[^\\\/]+$`
    ]
  })
}