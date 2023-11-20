import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(dirname, `../src`)

const GlobJSExts = [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`]
const exts = GlobJSExts.join(`,`)
const GlobJSFiles = `**/*.{${exts}}`

export const getEntries = async () => {
  return await glob(GlobJSFiles, {
    cwd: srcDir,
    nodir: true,
    absolute: true,
    ignore: [
      `**/*.d.ts`,
      `/node_modules/`,
      `**/index.{${exts}}`,
      `\\.pnp\\.[^\\\/]+$`,
      `**/__tests__/**/*.{${exts}}`,
      `**/__mocks__/**/*.{${exts}}`,
      `**/node_modules/**/*.{${exts}}`,
    ],
  })
}
