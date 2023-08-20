/** @module Function */

import { isNum } from '@number/isNum'
import { isFunc } from './isFunc'

/**
 * Execute a method n times.
 * <br/>Callback params - does not include number || callback method
 * @function
 * @example
 * doIt(10, window, [], (index, arr) => { arr.push(index) }) === [ 0,1,2 ... 8,9 ]
 * @example
 * doIt(10, () => console.log(`Hello`)) // Logs `Hello` 10 times
 * @param {Number} args.0 - number of times to call the callback
 * @param {parent} args.1 - value to bind the method call to ( this )
 * @param {Function} args.last arg of args array - method to call
 * @return { void }
 */
export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    num:number,
    bindTo:any,
    last:F
  ): ReturnType<F>[]
export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    bindTo:any,
    num:number,
    last:F
  ): ReturnType<F>[]
export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    bindTo:any,
    last:F,
    num:number,
  ): ReturnType<F>[]
export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    num:number,
    last:F
  ): ReturnType<F>[]
export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    last:F,
    num:number,
  ): ReturnType<F>[]
export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    last:F,
    bindTo:any,
    num:number,
  ): ReturnType<F>[]

export function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(...args:Array<F|any|number>) {
  const params = args.slice()

  const num = params.find(p => isNum(p))
  if (!num) return []
  params.splice(params.indexOf(num), 1)

  const bindTo = params.find(p => !isNum(p))
  bindTo && params.splice(params.indexOf(bindTo), 1)

  const reverse = [...params].reverse()
  const cb = reverse.find(p => isFunc(p))
  cb && params.splice(params.indexOf(cb), 1)
  if (!isFunc(cb)) return []

  const doItAmount = new Array(num)
  const responses = []
  for (let i = 0; i < doItAmount.length; i++) {
    const data = cb.call(bindTo, i, ...params)
    if (data === false) break
    responses.push(data)
  }

  return responses
}
