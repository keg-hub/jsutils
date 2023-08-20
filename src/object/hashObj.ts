/** @module Object */

const pad = (hash:any, len:number) => {
  while (hash.length < len) hash = '0' + hash

  return hash
}

const fold = (hash:any, text:string) => {
  if (text.length === 0) return hash

  let i
  let chr
  let len

  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }

  return hash < 0 ? hash * -2 : hash
}

const foldObject = (hash:any, obj:Record<string, any>, seen:any[]) => {
  const foldKey = (hash:any, key:string) => foldValue(hash, obj[key], key, seen)

  return Object.keys(obj).sort()
    .reduce(foldKey, hash)
}

const foldValue = (
  input:number,
  value:any,
  key:string,
  seen:any[]
) => {
  const hash = fold(fold(fold(input, key), toString(value)), typeof value)

  if (value === null) return fold(hash, 'null')

  if (value === undefined) return fold(hash, 'undefined')

  if (typeof value === 'object' || typeof value === 'function') {
    if (seen.indexOf(value) !== -1) return fold(hash, '[Circular]' + key)

    seen.push(value)

    const objHash = foldObject(hash, value, seen)

    if (!('valueOf' in value) || typeof value.valueOf !== 'function') objHash

    try {
      return fold(objHash, String(value.valueOf()))
    }
    catch (err) {
      return fold(objHash, '[valueOf exception]' + (err.stack || err.message))
    }
  }

  return fold(hash, value.toString())
}

const toString = (obj: Record<any, any>) => Object.prototype.toString.call(obj)

/**
 * Creates a consistent hash string from the passed in object
 * <br/>Not intended to be secure
 * <br/>Given the same input keys and values, it will always return the same output hash
 */
export const hashObj = (obj: Record<any, any>): string => pad(foldValue(0, obj, '', []).toString(16), 8)
