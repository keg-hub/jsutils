import { promises as fs } from 'fs'

const loopAliases = (content: string, aliases: Record<string, string>) => {
  return Object.entries(aliases).reduce((acc, [key, val]) => {
    return acc
      .replaceAll(`from '${key}`, `from '${val}`)
      .replaceAll(`from "${key}`, `from "${val}`)
      .replaceAll(`require('${key}`, `require('${val}`)
      .replaceAll(`require("${key}`, `require("${val}`)
  }, content)
}

export const aliasReplace = (aliases: Record<string, string>) => {
  return {
    name: 'AliasReplace',
    setup(build) {
      build.onLoad({ filter: /\.*/ }, async args => {
        const text = await fs.readFile(args.path, 'utf8')
        const replaced = loopAliases(text, aliases)
        return {
          loader: `ts`,
          contents: replaced,
        }
      })
    },
  }
}
