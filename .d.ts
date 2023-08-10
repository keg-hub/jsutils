declare module "@keg-hub/jsutils" {

  /**
  * <p>Builds a map of elements mapped to their frequency counts</p>
  */
  function buildElementCountMap(arr: any[]): Map<any, number>;
  /**
  * <p>Returns true if the maps</p>
  * @returns <ul>
  * <li>True if the item count it equal between mapA and mapB</li>
  * </ul>
  */
  function areCountMapsEqual(mapA: Map<any, number>, mapB: Map<any, number>): boolean;

  /**
  * <p>Checks if arrays are frequency equal. Does this
  * by making only one pass over each array and using an auxillary map.</p>
  * @returns <ul>
  * <li>True if otherArr contains exactly the same elements as arr, where order does not matter, but frequency does</li>
  * </ul>
  */
  function areFrequencyEqual(arr: any[], otherArr: any[]): boolean;

  /**
  * <p>Checks if arrays are set-equal: they contain the same elements,
  * but element frequencies don't matter.
  * Does this with one pass over each array and an auxilliary set.</p>
  */
  function areSetEqual(arr: any[], otherArr: any[]): boolean;

  /**
  * <p>Creates a copy of the passed in array.
  * <br/>Returns empty array, if param is not an array.</p>
  * @example
  * cloneArr([1,2,3])
  * // Returns copy of the passed on array
  * @param arr - <p>array to be copied</p>
  * @returns <ul>
  * <li>copy of passed in array</li>
  * </ul>
  */
  function cloneArr<T=any>(arr: T[]): T[];

  /**
  * <p>Returns a if it is an Array, else returns b</p>
  * @example
  * const foo = eitherArr('hi', 1) // returns 1
  * const bar = eitherArr([ 2 ], 1) // returns [ 2 ]
  * @returns <p>either a, if it's an array, or b</p>
  */
  function eitherArr<T=any>(a?: any, b?: any): T;

  /**
  * <p>Ensures the passed in value is an array, else it returns it in an array</p>
  * @example
  * const foo = eitherArr('hi') // returns ['hi']
  * const bar = eitherArr([ 2 ]) // returns [ 2 ]
  * @param val - <p>Value to check if its an array</p>
  * @returns <p>val if it's an array, or val in an array</p>
  */
  function ensureArr<T=any>(val: any[] | any): T[];

  /**
  * <p>Finds the extremum (e.g. max, min) element within array <code>arr</code> as defined by the <code>comparator</code> function</p>
  * @example
  * const max = findExtrema([ { a: 1 }, { a: 2} ], (x, y) => x.a - y.a)
  * // max === { a: 2 }
  * @param comparator - <p>comparison function like the compareFunction in sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort</p>
  * @returns <p>the element in <code>arr</code> that is the extremum as defined by <code>comparator</code>. If arr is empty, this function returns null.</p>
  */
  function findExtrema(arr: any[], comparator: (extremaSoFar: any, next: any) => any): any;

  /**
  * <p>Returns the maximum element in arr</p>
  * @example
  * const items = [ { num: 1 }, { num: 3 } ]
  * findMax(items, item => item.num) // returns { num: 3 }
  * @param propSelector - <p>optional property selector for choosing the property to compare with</p>
  */
  function findMax(arr: object[], propSelector: (prop:any) => any): void;

  /**
  * <p>Returns the minimum element in arr</p>
  * @example
  * const items = [ { num: 1 }, { num: 3 } ]
  * findMax(items, item => item.num) // returns { num: 1 }
  * @param propSelector - <p>optional property selector for choosing the property to compare with</p>
  */
  function findMin(arr: object[], propSelector: (prop:any) => any): void;

  /**
  * <p>Flattens an array to a single level</p>
  * @example
  * const arr = flatArr([[ 'flat', '' ], [ 'array' ]]) // returns ['flat', '', 'array']
  * const arrTruthy = flatArr([ 0, 2, [ false ] ], { truthy: true }) // returns [ 2 ]
  * const arrExist = flatArr([ 0, 2, [ false ] ], { exists: true }) // returns [ 0, 2, false ]
  * const mutateArr = [ [1], [2] ]
  * flatArr(mutateArr, { mutate: true }) === mutateArr
  * // Evaluates to true, but mutateArr value is [ 1, 2 ]
  * @param arr - <p>Array to be flattened</p>
  * @param opts - <p>Options to modify how the array is flattened</p>
  * @param opts.truthy - <p>Only include truthy values when flattening</p>
  * @param opts.exists - <p>Only include values that exist when flattening</p>
  * @param opts.mutate - <p>Mutates the original array</p>
  * @returns <ul>
  * <li>Mutated original array now flattened, or a new flattened array based on options</li>
  * </ul>
  */
  function flatArr<T=any>(arr: any[], opts?: {
      truthy?: boolean;
      exists?: boolean;
      mutate?: boolean;
  }): T[];

  /**
  * <p>Maps each element using mapping function <code>mapFn</code>, but returns the result as a flattened array.
  * It is equivalent to map() followed by flattening to depth 1, but flatMap is a useful shortcut,
  * and merging both steps into one method (with one pass over the array) is slightly more efficient.</p>
  * @example
  * [1, 2].map(x => [x * 2]) // returns [[2], [4]]
  * flatMap([1, 2], x => [x * 2]) // returns [2, 4]
  * @param arr - <p>array to map across</p>
  * @param mapFn - <p>function for mapping</p>
  */
  function flatMap(arr: any[], mapFn: (current:any) => any): void;

  /**
  * <p>Flattens the passed in array arguments and removes duplicates
  * Also removes non-existing values such as undefined and null
  * If the last argument is a function, it will be used as the comparison when checking for duplicates</p>
  * @example
  * flatUnion([1,1,2], [1,2,3])
  * // Returns array with only unique values [ 1, 2, 3 ]
  * @example
  * flatUnion([{a: 1}, { a: 3 }], [{a: 4}, { a: 1 }], item => item.a)
  * // Returns array with only unique values [ { a: 1 }, { a: 3 }, { a: 4 } ]
  * @param arr - <p>array to remove duplicates from</p>
  * @param selector - <p>optional function to specify the property to check if another element exists</p>
  * @returns <ul>
  * <li>Flattened copy of passed in array arguments, with duplicates removed</li>
  * </ul>
  */
  function flatUnion<T=any>(...params: any[]): T[];

  /**
  * <p>Checks if passed in value is an array.</p>
  * @example
  * isArr([1,2,3])
  * // Returns true
  * @param value - <p>value to be check if is an array</p>
  * @returns <ul>
  * <li>T/F value is an array</li>
  * </ul>
  */
  function isArr<T=any[]>(value: any): value is T;


  /**
  * <p>Creates and returns a new array of all items that exist in both passed in arrays</p>
  * @example
  * intersect([1,2], [1]) === [1]
  */
  function intersect<T=any[], M=any[], N=any[]>(arr1: M, arr2:N):T;


  /**
  * <p>Returns a new array with the same elements as arr, excluding <code>count</code> elements beginning at index <code>startIndex</code></p>
  */
  function omitRange<T=any[]>(arr: any[], startIndex: number, count: number): T[];

  /**
  * <p>Randomly selects values from a passed in array.</p>
  * @example
  * randomArr([1,2,3], 1)
  * // Returns an array with one of the values in the passed in array
  * @param arr - <p>array to select values from</p>
  * @param amount - <p>number of values to select from the array</p>
  * @returns <ul>
  * <li>randomly sorted array</li>
  * </ul>
  */
  function randomArr<T=any>(arr: any[], amount?: number): T[];

  /**
  * <p>Randomly sorts an arrays items.</p>
  * @example
  * randomizeArr([1,2,3])
  * // Returns an array randomly sorted
  * @param arr - <p>array to randomly sorted</p>
  * @returns <ul>
  * <li>randomly sorted array</li>
  * </ul>
  */
  function randomizeArr<T=any>(arr: any[]): T[];

  /**
  * <p>Removes duplicates from an array, checking by reference-equality</p>
  * @example
  * uniqArr([1,1,2,3,3])
  * // Returns array with only unique values [ 1, 2, 3 ]
  * @param arr - <p>array to remove duplicates from</p>
  * @returns <p>copy of passed in array, with duplicates removed</p>
  */
  function uniqArrByReference<T=any>(arr: any[]): T[];

  /**
  * <p>Removes duplicates from an array.</p>
  * @example
  * uniqArr([1,1,2,3,3])
  * // Returns array with only unique values [ 1, 2, 3 ]
  * @example
  * uniqArr([ {a: 1} , { a: 1 }], element => element.a)
  * // Returns array [ { a: 1 } ]
  * @param arr - <p>array to remove duplicates from</p>
  * @param selector - <p>optional function to specify the property uniqArr should use to check if another element exists</p>
  * @returns <p>copy of passed in array, with duplicates removed</p>
  */
  function uniqArr<T=any>(arr: any[], selector?: (element: any) => any): T[];

  /**
  * <p>Converts a value to a boolean as a string.</p>
  * @example
  * convertToStrBool(true)
  * // Returns 'true'
  * @param val - <p>value to convert to string boolean</p>
  * @returns <p>'true' || 'false' based on passed in value</p>
  */
  function convertToStrBool(val: any): 'true'|'false';

  /**
  * <p>Checks is value is a boolean.</p>
  * @example
  * isBool([1,2,3])
  * // Returns false
  * @example
  * isBool(true)
  * // Returns true
  * @param val - <p>value to check if is a number</p>
  * @returns <p>True if val is a boolean</p>
  */
  function isBool<T=boolean>(val: any): val is T;

  /**
  * <p>Checks is value is a boolean as a string.</p>
  * @example
  * isStrBool("true")
  * // Returns true
  * @example
  * isStrBool(true)
  * // Returns false
  * @param val - <p>value to check if boolean as a string</p>
  * @returns <p>True if val is a string boolean</p>
  */
  function isStrBool<T=string>(val: any):val is T;

  /**
  * <p>Checks if a value is falsy, excluding empty string and 0.</p>
  * @example
  * softFalsy('')
  * // Returns true
  * @example
  * softFalsy(0)
  * // Returns true
  * @example
  * softFalsy(null)
  * // Returns false
  * @param val - <p>value to check</p>
  * @returns <ul>
  * <li>True if val is truthy, an empty string or 0</li>
  * </ul>
  */
  function softFalsy<T=any>(val: any): T;

  /**
   * <p>Converts a value to a boolean.</p>
   * @example
   * toBool(null)
   * // Returns false
   * @example
   * toBool('false')
   * // Returns false
   * @example
   * toBool('true')
   * // Returns true
   * @param val - <p>value to convert</p>
   * @returns <p>true or false based on passed in value.</p>
   */
  function toBool(val: any): boolean;

  /**
   * <p>Cleans a collection by creating a new collection
   * With the null and undefined values removed</p>
   * @param coll - <p>Collection to remove empty values from</p>
   * @param [recursive = true] - <p>Should recursively clean child values</p>
   * @returns <ul>
   * <li>Cleaned collection</li>
   * </ul>
   */
  function cleanColl<T extends Record<any, any>|any[]=any>(coll:T, recursive?: boolean): any | any[];

  /**
   * Updates a collection by removing, getting, adding to it.
   * @private
   * @function
   * @param {Object} obj - Object to update
   * @param {string|Array<string>} path - Dot notation or Array path to the property to be updated
   * @param {string} type - Type of update to make to the obj argument
   * @param {*} val - Value to set or return based on the type argument
   * @returns {*} - Relative to the type argument
   */
  function updateColl<T extends Record<any, any>|any[]=any>(coll:T, path:string, type:string, val:any):undefined;

  /**
  * <p>Recursively clones an object or array.</p>
  * @example
  * const test = { foo: [ { bar: 'baz' } ] }
  * const clone = deepClone(test)
  * console.log(test === clone)) // prints false
  * console.log(test.foo === clone.foo) // prints false
  * @example
  * // Works with array too
  * deepClone([ [ [ 0 ] ] ])
  * // Returns copy of the passed in collection item
  * @param obj - <p>Object to clone</p>
  * @returns <ul>
  * <li>Cloned Object</li>
  * </ul>
  */
  function deepClone<T=Record<any, any>|any[]>(obj: any): T;

  /**
  * <p>Recursively checks if two collections are equal
  * <br/>Faster the JSON.stringify checks
  * <br/>See https://jsperf.com/fast-deep-equal-vs-json-stringify</p>
  * @example
  * const test = { foo: [ { bar: 'baz' } ] }
  * const test2 = { foo: [ { bar: 'baz' } ] }
  * console.log(test === test2)) // prints false
  * deepEqual(test, test2) // returns true
  * @example
  * // Works with arrays too
  * deepClone([ [ [ 0 ] ] ], [ [ [ 0 ] ] ]) // returns true
  * @param a - <p>Object to check</p>
  * @param b - <p>Object to check against</p>
  */
  function deepEqual<T=Record<any, any>|any[], M=Record<any, any>|any[]>(a: T, b: M): boolean;

  /**
  * <p>Searches an object based on the path param
  * <br/>I.E. path = 'data.foo.bar' =&gt; will return obj.data.foo.bar.
  * <br/>If bar does not exist, then will return obj.data.foo</p>
  * @example
  * get(obj, 'data.foo.bar')
  * // Returns the value of bar
  * @example
  * get(obj, ['data', 'foo', 'bar'])
  * // Returns the value of bar
  * @param obj - <p>Will search the object based on the path</p>
  * @param path - <p>Dot notation string or Array of string keys of the object</p>
  * @param [fallback] - <p>Separated string to search the object</p>
  * @returns <ul>
  * <li>The final value found from the path</li>
  * </ul>
  */
  function get<T=any>(obj: Record<any, any>|any[], path: string | string[], fallback?: T): T;

  /**
  * <p>Checks if the value is a collection ( object || array ).</p>
  * @example
  * isColl([1,2,3])
  * // Returns true
  * @example
  * isColl({ foo: 'bar' })
  * // Returns true
  * @example
  * isColl(null)
  * // Returns false
  * @param val - <p>Value to check</p>
  * @returns <p>True if the value is a collection (Object || Array)</p>
  */
  function isColl<T=Record<any, any>|any[]>(val: any): val is T;

  /**
  * <p>Checks if passed in obj || array is empty.</p>
  * @example
  * isEmptyColl({})
  * // Returns true
  * @example
  * isEmptyColl({ foo: 'bar' })
  * // Returns false
  * @example
  * isEmptyColl([])
  * // Returns true
  * @param obj - <p>Object to check if empty</p>
  * @returns <ul>
  * <li>True if the passed in collection is empty</li>
  * </ul>
  */
  function isEmptyColl<T=Record<any, any>|any[]>(obj: any): obj is T;

  /**
  * <p>Loops over a collection and calls a passed in function for each one.</p>
  * @example
  * mapColl([1, 2, 3], (key, val, coll) => { console.log(key) })
  * // Will log all keys of the collection
  * @param coll - <p>Collection to loop over</p>
  * @returns <p>returns the same type of collection passed in</p>
  */
  function mapColl<T=Record<any, any>|any[]>(coll: Record<any, any>|any[]): T;

  /**
  * <p>Finds the first element in coll whose mapped value passes the testFunc function, then returns
  * the <strong>mapped</strong> value.
  * It will not map the entire array or object; only the subset needed to find the first passing element.</p>
  * @example
  * // Find the first file path that can be required from disk
  * const filePaths = [...]
  * const loadedFile = mapFind(filePaths, tryRequireSync)
  * @example
  * // Find the first file path whose required value is an object
  * const filePaths = [...]
  * const loadedFile = mapFind(filePaths, tryRequireSync, isObj)
  * @example
  * // Find the first file path whose required value is an object
  * const filePaths = { document: "foo/bar/doc.txt", image: "foo/bar/pic.img"}
  * const loadedFile = mapFind(filePaths, (value, key) => tryRequireSync(value), isObj)
  * @param coll - <p>Elements to map and find</p>
  * @param mapper - <p>Mapping function of form: (value, key, idx) -&gt; *. &quot;key&quot; is the index when coll is an array. &quot;idx&quot; is the index of the array value or object entry.</p>
  * @param testFunc - <p>Predicate function of form: (mappedValue, key, idx) -&gt; true/false. Defaults to checking if the mapped value is defined. &quot;key&quot; is the index when coll is an array.</p>
  * @returns <ul>
  * <li>The first passing mapped value</li>
  * </ul>
  */
  function mapFind(coll: Record<any, any>|any[], mapper: (...params: any[]) => any, testFunc: (...params: any[]) => any): any;

  /**
  * <p>Loops over collection and calls reduce.</p>
  * @example
  * reduceColl([1, 2, 3], (key, val, coll) => { console.log(key) }, {})
  * // Returns what ever is returned from the last iteration of the reduce loop
  * @param obj - <p>Object to loop over its keys</p>
  * @param cb - <p>Predicate function to call for each key of the collection</p>
  * @param reduce - <p>Starting data passed to reduce method</p>
  * @returns <ul>
  * <li>Last returned data from the loop</li>
  * </ul>
  */
  function reduceColl<T=any>(obj: Record<any, any>|any[], cb: (key:string, value:any, coll:Record<any, any>|any[], data:any) => any, reduce?: any): T;

  /**
  * <p>Returns an array composed of element repeated &quot;times&quot; times. If element is a function, it will be called.
  * <br/>Note: if you simply want to run a function some number of times, without returning an array of its results, @see Method.doIt</p>
  * @example
  * repeat(1, 3) // returns [1, 1, 1]
  * @example
  * repeat(() => 2 * 2, 3) // returns [4, 4, 4]
  * @param element - <p>A value or a function. If it is a function, repeat will call it each repeated time</p>
  * @param times - <p>Number of times that element should be included/called for the resulting array. Anything less than or equal to 0, or not a number, will return an empty array.</p>
  * @param cloneDeep - <p>If true, it will deeply clone the element for every instance in the resulting array</p>
  * @returns <ul>
  * <li>An array of repeated elements or results from the function call</li>
  * </ul>
  */
  function repeat(element: any, times: number, cloneDeep?: boolean): any[];

  /**
  * <p>Adds a path to an object.
  * <br/>If the path already exists, but not in the correct format it will be replaced.
  * <br/>The path is built from a <code>.</code> separated string.
  * <br/>I.E. path = 'data.foo.bar' =&gt; obj.data.foo.bar will be created on the object.</p>
  * @example
  * set(obj, [ 'foo', 'bar' ], 'baz')
  * // Returns the passed in obj, with the value of bar set to baz
  * @example
  * set(obj, 'foo.bar', 'baz')
  * // Returns the passed in obj, with the value of bar set to baz
  * @param obj - <p>Object to have the path added to it</p>
  * @param path - <p>Path that should be created on the object, separated by .</p>
  * @param finalValue - <p>When ever the final value of the path should be</p>
  * @returns <ul>
  * <li>The obj with the passed in value set to the passed in path</li>
  * </ul>
  */
  function set<T=Record<any, any>|any[], V=any>(obj: T, path: string | string[], finalValue: V): T;

  /**
  * <p>Compares a collection's keys / values with another collections keys / values</p>
  * @example
  * shallowEqual({ foo: 'bar' }, { foo: 'bar' })
  * // Returns true
  * @example
  * shallowEqual({ foo: 'bar', baz: {} }, { foo: 'bar', baz: {} })
  * // Returns false, because the baz values are different objects
  * @example
  * // Works with array too
  * shallowEqual([ 1, 2 ], [ 1, 2 ])
  * // Returns true
  * @example
  * shallowEqual([{ foo: 'bar' }], [{ foo: 'bar' }])
  * // Returns false, because the objects in index 0 are different
  * @example
  * // Pass a path to compare instead of the root
  * shallowEqual({ foo: { bar: { baz: 'biz' }}}, { foo: { bar: { baz: 'biz' }}}, 'foo.bar')
  * // Returns true, because the bar object is compared
  * @param col1 - <p>Collection to compare</p>
  * @param col2 - <p>Collection to compare</p>
  * @param path - <p>Path of object to compare. Uses the get method to find the path</p>
  * @returns <ul>
  * <li>true or false if the objects keys values are equal</li>
  * </ul>
  */
  function shallowEqual(col1: Record<any, any>|any[], col2: Record<any, any>|any[], path?: string|string[]): boolean;

  /**
  * <p>Removes a path from an object.</p>
  * @example
  * unset(obj, 'foo.bar')
  * // Returns the passed in obj, with the value of bar set to undefined
  * @param obj - <p>Object to have the attribute removed</p>
  * @param path - <p>Path of attribute to be removed, separated by string</p>
  * @returns <ul>
  * <li>The passed in object, with the attribute found at the path removed</li>
  * </ul>
  */
  function unset<T=Record<any, any>|any[]>(obj: T, path: string|string[]): T;

  /**
  * <p>Determines the correct value to return, by calling the passed in check function.
  * <br/>If no check function, then it uses the softFalsy method.</p>
  * @example
  * either(0, 2)
  * // Returns 0
  * @example
  * either(null, 2)
  * // Returns 2
  * @example
  * either(1, 2, (val1, val2) => { return true })
  * // Returns 1
  * @param val1 - <p>return if passes in check method return true</p>
  * @param val2 - <p>return if passed in check method returns false</p>
  * @param check - <p>called to determine which value to return</p>
  */
  function either<T=any>(val1?: any, val2?: any, check?: (v1:any, v2:any) => any): T;

  /**
  * <p>Checks if a value exists. NOT undefined || null</p>
  * @example
  * exists(0)
  * // Returns true
  * @example
  * exists(null)
  * // Returns false
  * exists('')
  * // Returns true
  * exists(NaN)
  * // Returns false
  * @param value - <p>Item to check if exists</p>
  * @returns <ul>
  * <li>If the item exists or not</li>
  * </ul>
  */
  function exists<T=any>(value: any): value is T;

  /**
  * <p>Checks if the value is empty.</p>
  * @example
  * isEmpty('')
  * // Returns true
  * @example
  * isEmpty({})
  * // Returns true
  * @example
  * isEmpty([ 1 ])
  * // Returns false
  * @param val - <p>value to check</p>
  * @returns <p>if the value is empty</p>
  */
  function isEmpty<T=boolean>(val: any): val is T;

  /**
  * <p>Checks if the passed in values are exactly the same.</p>
  * @example
  * isSame(1, 1)
  * // Returns true
  * @param val1 - <p>value to compare</p>
  * @param val2 - <p>value to compare</p>
  * @returns <p>is the values are the same</p>
  */
  function isSame(val1: any, val2: any): val1 is typeof val2;

  /**
  * <p>Checks is passed in date is a valid date.</p>
  * @example
  * isValidDate(new Date())
  * // Returns true
  * @example
  * isValidDate(new Date().tostring())
  * // Returns true
  * @example
  * isValidDate('12345678')
  * // Returns false
  * @param date - <p>value to check</p>
  * @returns <p>T/F - if passed in date is a valid date</p>
  */
  function isValidDate<T=Date>(date: any): date is T;

  /**
  * <p>Reuseable empty, frozen object</p>
  */
  type noOpObj<T extends Record<any, any>=Record<any, any>> = T;
  // @ts-ignore
  export const noOpObj = {};

  /**
  * <p>Reusable frozen object that contains a <code>content</code> object. Useful</p>
  */
  type noPropObj<T extends Record<any, any>=Record<any, any>> = T;
  // @ts-ignore
  export const noPropObj = {};

  /**
  * <p>Reuseable empty, frozen object</p>
  */
  type emptyObj<T extends Record<any, any>=Record<any, any>> = T;
  // @ts-ignore
  export const emptyObj = {};

  /**
  * <p>Reusable, empty frozen array</p>
  */
  type noPropArr<T=any> = T[];
  // @ts-ignore
  export const noPropArr = [];

  /**
  * <p>Reusable, empty frozen array.
  * Renamed for consistency</p>
  */
  type noOpArr<T=any> = T[];
  // @ts-ignore
  export const noOpArr = [];

  /**
  * <p>Reusable, empty frozen array.
  * Renamed for consistency</p>
  */
  type emptyArr<T=any> = T[];
  // @ts-ignore
  export const emptyArr = [];

  /**
  * <p>Converts a string to its own type if possible.</p>
  * @example
  * strToType('12345678')
  * // Returns 12345678
  * @example
  * strToType('{}')
  * // Returns {}
  * @example
  * strToType('[]')
  * // Returns []
  * @param val - <p>value to convert</p>
  * @returns <p>converted value || string if can't convert</p>
  */
  function strToType<T=any>(val: any): T;

  /**
  * <p>Gets the type of the passed in val.</p>
  * @example
  * typeOf(1)
  * // Returns Number
  * @example
  * typeOf('')
  * // Returns string
  * @param val - <p>value to get type for</p>
  * @returns <p>type of the value</p>
  */
  function typeOf(val: any): string;

  /**
  * <p>Turns logs on || off.
  * <br/>Set the default log method.
  * <br/>Add a prefix to all log message</p>
  * @example
  * setLogs(true, 'dir', '[ DEV MODE ]')
  * @param log - <p>log values</p>
  * @param methDef - <p>default log method</p>
  * @param prefix - <p>string to add to all logs</p>
  */
  function setLogs(log: boolean, methDef?: string, prefix?: string): void;

  /**
  * <p>Resets log settings to default</p>
  * @example
  * resetLogs()
  * // Resets settings set from the `setLogs method`
  */
  function resetLogs(): void;

  /**
  * <p>Logs a string to the inspector, uses the last argument to determine the log type</p>
  * @example
  * logData('data to log', 'error')
  * // Will call console.error('data to log')
  * @param args - <p>to be passed to the log call</p>
  */
  function logData(args: any[]): void;

  /**
  * <p>Helper for pipeline. Passes 'item' into 'expression' as its first argument.
  * <br/>Expression may be a function or an array of form: [function, ...remainingArguments].</p>
  */
  function applyToFunc(item: any, expression: any): void;

  /**
  * <p>Check if the passed in method is a function, and calls it</p>
  * @example
  * checkCall((param1) => { return param1 }, 'foo')
  * // Returns 'foo'
  * @param method - <p>function to call</p>
  * @param params - <p>params to pass to the method on call</p>
  * @returns <ul>
  * <li>whatever the passed in method returns</li>
  * </ul>
  */
  function checkCall<P=unknown, T=unknown>(method: (param?:P, ...params:any[]) => T, param?:P, ...params:any[]): T;
  function checkCall<T=any>(method: <M=any>(...params: any[]) => M, ...params:any[]): T;
  function checkCall<T=any>(method: (...params: any[]) => any, ...params:any[]): T;
  function checkCall(method: (...params: any[]) => any, ...params:any[]): any;

  /**
  */
  function ife<P=unknown, T=unknown>(method: (param?:P, ...params:any[]) => T, param?:P, ...params:any[]): T;
  function ife<T=any>(method: <M=any>(...params: any[]) => M, ...params:any[]): T;
  function ife<T=any>(method: (...params: any[]) => any, ...params:any[]): T;
  function ife(method: (...params: any[]) => any, ...params:any[]): any;

  /**
  */
  function iife<P=unknown, T=unknown>(method: (param?:P, ...params:any[]) => T, param?:P, ...params:any[]): T;
  function iife<T=any>(method: <M=any>(...params: any[]) => M, ...params:any[]): T;
  function iife<T=any>(method: (...params: any[]) => any, ...params:any[]): T;
  function iife(method: (...params: any[]) => any, ...params:any[]): any;

  /**
   * Generates an small id, using the uuid method to ensure randomness
   */
  function nanoid(base?:string|TNanoidOpts, opts?:TNanoidOpts):string;
  type TNanoidOpts = {
    joiner?:string
    parts?:number
    prefix?:string
  };

/**
  * Converts the passed in method into a callback to allow calling the method in place
  * Second argument can be a boolean or defaults object
  * When boolean, if true, the callback will forward arguments when called, false will not
  * When object, will be passed as the first argument of the callback
  *   * Checks the `allowArgs` property to know if it should forward arguments to the callback
 */
  function asCallback<T=(...args:any[])=>any>(callback:T, defs:Record<any, any>|boolean):T;

  /**
  * <p>Clones a function using the Function constructor and calling tostring on the passed in function</p>
  * @example
  * const func = () => { console.log('test') }
  * const clone = cloneFunc(func)
  * // clone !== func
  * @param func - <p>function to clone</p>
  * @returns <p>cloned function</p>
  */
  function cloneFunc<T=any>(func: (...params: any[]) => any): T;

  /**
  * <p>Generic compare to method that works for strings, numbers, and booleans</p>
  * @returns <ul>
  * <li>returns a value &lt; 0 if x is less than y, 0 if they are equal, and a value greater than 0 if x is greater than y. Returns null if the args are not comparable.</li>
  * </ul>
  */
  function compareTo(x: string | number | boolean, y: string | number | boolean): number | null;

  /**
  * <p>Returns a new function that is the complement of predicate function <code>predicate</code></p>
  * @example
  * const isNegative = x => (x < 0)
  * const isNonNegative = complement(isNegative)
  * isNonNegative(1) // true
  * @returns <p>the complement of <code>predicate</code>, if it's a function, otherwise null</p>
  */
  function complement(predicate: (...params: any[]) => any): (...params: any[]) => any;

  /**
  * <p>Limits the amount of calls to a function over time</p>
  * @example
  * debounce(myFunction)
  * // Calls myFunction after the default 250 ms
  * @example
  * debounce(myFunction, 500)
  * // Calls myFunction after 500 ms
  * @example
  * debounce(myFunction, 500, true)
  * // Calls myFunction immediately
  * @param func - <p>function to call</p>
  * @param wait - <p>how long to wait between function calls</p>
  * @param immediate - <p>should call immediately</p>
  */
  function debounce<T=(...args:any[])=> any>(func: (...params: any[]) => any, wait?: number, immediate?: boolean): T;

  /**
  * <p>Execute a method n times.
  * <br/>Callback params - does not include number || callback method</p>
  * @example
  * doIt(10, window, [], (index, arr) => { arr.push(index) }) === [ 0,1,2 ... 8,9 ]
  * @param args.0 - <p>number of times to call the callback</p>
  * @param args.1 - <p>value to bind the method call to ( this )</p>
  * @param last - <p>arg of args array - method to call</p>
  */
  function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    num:number,
    bindTo:any,
    last:F
  ): ReturnType<F>[];
  function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    bindTo:any,
    num:number,
    last:F
  ): ReturnType<F>[];
  function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    bindTo:any,
    last:F,
    num:number,
  ): ReturnType<F>[];
  function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    num:number,
    last:F
  ): ReturnType<F>[];
  function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    last:F,
    num:number,
  ): ReturnType<F>[];
  function doIt<F extends (...params: any[]) => any=(...params: any[]) => any>(
    last:F,
    bindTo:any,
    num:number,
  ): ReturnType<F>[];

  /**
  * <p>Returns the first param if it's a function.
  * <br/>If first param is not a function, returns second param.</p>
  * @example
  * eitherFunc(() => {}, 'bar')
  * // Returns first param because it's a function.
  * @example
  * eitherFunc('foo', 'bar')
  * // Returns 'bar'
  * @param func1 - <p>return if is func</p>
  * @param func2 - <p>use if first is not an object</p>
  */
  function eitherFunc(func1: (...params: any[]) => any, func2: (...params: any[]) => any): (...params: any[]) => any;

  /**
  * <p>Checks if there is access to the dom</p>
  * @example
  * // In Browser
  * hasDomAccess() === true
  * // In Node
  * hasDomAccess() === false
  * @returns <p>True if executed in a browser</p>
  */
  function hasDomAccess(): boolean;

  /**
  * <p>A function that simply returns its input</p>
  * @returns <p>the input</p>
  */
  function identity<T=any>(x: T): T;

  /**
  * <p>Check if the passed in item is a function.</p>
  * @example
  * isFunc(() => {})
  * // Returns true
  * @example
  * isFunc('bar')
  * // Returns false
  * @returns <p>is a function</p>
  */
  function isFunc<T=(...args:any[])=>any>(test: any): test is T;

  /**
  * <p>Checks if param is an orderable primitive</p>
  * @returns <ul>
  * <li>true if x is a comparable primitive</li>
  * </ul>
  */
  function isOrderable(x: any): boolean;

  /**
  * <p>Adds catch to a promise for better error handling of await functions
  * <br/>Removes the need for wrapping await in a try / catch
  * <br/>First argument is an Error when the promise throws or null when it resolves
  * <br/>Second argument is the response from the resolved promise</p>
  * @example
  * const [ err, data ] = await limbo(promiseFunction())
  * // returns an array
  * // * err will be undefined if no error was thrown
  * // * data will be the response from the promiseFunction
  * @example
  * const [ err, data ] = await limbo(promiseFunction(), true)
  * // returns an array
  * // * err will be undefined if no error was thrown
  * // * data will be the response from the promiseFunction or an empty object
  * @param promise - <p>Promise to be resolved</p>
  * @returns <ul>
  * <li>Slot 1 =&gt; error, Slot 2 =&gt; response from promise or empty object</li>
  * </ul>
  */
  function limbo<T=any, E=Error>(promise: Promise<any>, asObj?:boolean): Promise<[err?:E, response?:T]>;
  function limbo<T=any>(promise: Promise<any>, asObj?:boolean): Promise<[err?:Error, response?:T]>;
  function limbo(promise: Promise<any>, asObj?:boolean): Promise<[err?:Error, response?:any]>;


  /**
  * <p>Converts a method with a callback as the last argument into a promise</p>
  * @function
  * @param {*} cb - <p>method to wrap in a promise</p>
  * @param {*} args - <p>Arguments to pass to the callback method</p>
  * @example
  * limboify(fs.rename, 'my/file.txt', 'my/renamed-file.txt')
  * @example
  * limboify(fs.mkdir, 'my/new/directory', { recursive: true })
  * @returns <ul>
  * <li>Success response of executed Promise</li>
  * </ul>
  */
  function limboify<T=any>(cb:(...params:any[]) => any, ...args:any[]): Promise<[err?:Error, response?:T]>;


  /**
  * <p>Pattern matching function. Iterates through the entries,
  * <br/>which have the form [ check value or predicate, return value ], and
  * <br/>when it encounters an entry whose check value matches the matchArg
  * <br/>(or the predicate returns true when passed the matchArg), it returns
  * <br/>the return value of that entry.</p>
  * <p>For the default case: use [ match.default, <your default value> ]</p>
  * @example
  * const value = 1
  * match(value,
  *  [ 1, "hello" ],
  *  [ x => x > 2, "greater" ]
  *  [ match.default, "defaulted"]
  * )
  * => returns "hello"
  * @example
  * const value = 3
  * match(value,
  *  [ 1, "hello" ],
  *  [ x => x > 2, "greater" ]
  * )
  * => returns "greater"
  * @example
  * // react reducer:
  * function todoReducer(state, action) {
  *   const reducer = match(action.type,
  *       [ 'ADD-TODO', addTodo ],
  *       [ 'REMOVE-TODO', removeTodo ],
  *       [ 'UPDATE-TODO', updateTodo ],
  *       [ match.default, state ]
  *   )
    *
  *   return reducer(state, action)
  * }
  * @param matchArg - <p>the argument to match against the cases</p>
  * @param entries - <p>the cases to match against the matchArg</p>
  * @returns <ul>
  * <li>the return value of the first entry with a matching check value, else null</li>
  * </ul>
  */
  function match<T=any>(matchArg: any, entries: any[]): T;

  /**
  * <p>Creates a method to memorize passed in methods output</p>
  * @example
  * memorize(myFunction, cacheKeyFunction)
  * @example
  * memorize(myFunction, cacheKeyFunction, 100)
  * @param func - <p>method to memorize output of</p>
  * @param getCacheKey - <p>gets the key to save cached output</p>
  * @returns <p>memorized function with cache</p>
  */
  function memorize(func: (...params: any[]) => any, getCacheKey: (...params: any[]) => any): (...params: any[]) => any;

  /**
  * <p>Reusable empty function that is a no-op</p>
  */
  function noOp(): void;

  /**
  * <p>Extracts the message from the exception, whether string or object</p>
  * @example
  * try {
  *   throwSomeException()
  * }
  * catch (err) {
  *   const message = parseErrorMessage(err) || 'Error'
  * }
  * @param exception - <p>Error to be extracted</p>
  * @returns <ul>
  * <li>The message or null if no message is present</li>
  * </ul>
  */
  function parseErrorMessage(exception: any): string;

  /**
  * <p>Function for making repeated nested function calls (the 'pipeline') succinct. Passes &quot;item&quot; into
  * <br/>the first function (as its first argument), takes its result and passes that into the next function, and repeats.
  * <br/>Continues until no functions remain, at which point it returns the value returned by the last function.
  * <br/> - you can also pass in an array in place of a function to specify a function to be called with some arguments. E.g.: [foo, 2, 3] would return foo(item, 2, 3)</p>
  * @param item - <p>the starting input. If it is a function, it will be executed immediately and the result will be piped into the remaining functions.</p>
  * @param functions - <p>Functions to be iterated over one after the other</p>
  * @returns <ul>
  * <li>the final result of calling the pipeline of functions , starting with item as input</li>
  * </ul>
  */
  function pipeline(item: any, ...functions: ((...params: any[]) => any)[]): any;

  /**
  * <p>Calls each promise-returning function in array <code>asyncFns</code>,
  * but awaits each before calling the next. Will pass the
  * index and resolved values of complete functions to each subsequent
  * function, in case any need them.</p>
  * @example
  * const results = await runSeq(asyncFunctions)
  * @example
  * const results = await runSeq(asyncFunctions, { cloneResults: true, returnOriginal: false })
  * @param asyncFns - <p>array of functions to call in sequence.
  * Each will be passed (currentIndex, resultsSoFar)</p>
  * @param [options.cloneResults = false] - <p>if true, each function will be
  * passed a deep clone of the results array, rather than the reference to it.</p>
  * @param [options.returnOriginal = true] - <p>if true, any member of asyncFns that
  * is not a function will have its corresponding value in the return array be itself.
  * If this is false, that value will be undefined.</p>
  * @returns <ul>
  * <li>returns a promise that resolves to an array of all the
  * asyncFns' return values</li>
  * </ul>
  */
  function runSeq(asyncFns: ((...params: any[]) => void)[]): Promise<any[]>;

  /**
  * <p>Throttle function calls to only execute once over a wait period</p>
  * @example
  * throttle(() => console.log('throttled'), 50)()
  * @param func - <p>method to call after wait</p>
  * @param [wait = 100] - <p>time to wait between calls</p>
  * @returns <p>throttled function</p>
  */
  function throttle(func: any, wait?: number): (...params: any[]) => any;

  /**
  * <p>Ensures the last call to the throttled function get called.
  * <br/>Will wait the allotted time, before calling the last call to it.
  * <br/>The final call will not execute until no more calls are made,
  * <br/>Accepts a callback to call each time the throttle called,</p>
  * @example
  * throttleLast(() => {}, () => {})()
  * // throttle function
  * @param func - <p>method to call after wait</p>
  * @param cb - <p>method to call after throttle function is called</p>
  * @param [wait = 100] - <p>time to wait until executing func param</p>
  * @returns <p>throttled function</p>
  */
  function throttleLast(
    func: (...params: any[]) => any,
    wait?: number
  ): (...params: any[]) => any;
  function throttleLast(
    func: (...params: any[]) => any,
    cb?: (...params: any[]) => any,
    wait?: number
  ): (...params: any[]) => any;

  /**
  * <p>Throws an Error from the passed in error</p>
  * @param {Object|string} error - The Error message or Object to throw
  * @throws
  */
  function throwError(error:string|Error):void

  /**
  * <p>Executes and times the function <code>fn</code>.</p>
  * @example
  * const [ result, executionTime ] = timedRun(() => http.get(url)))
  * @example
  * const [ result, executionTime ] = timedRun(http.get, url)
  * @param args - <p>any number of arguments to pass to fn when it is called</p>
  * @returns <p>[ fn output, execution time in ms ]</p>
  */
  function timedRun(fn: (...params: any[]) => any, ...args: any[]): Promise<any[]>;

  /**
  * <p>Creates a uuid, unique up to around 20 million iterations.</p>
  * @example
  * uuid()
  * // New uuid as a string
  * @param start - <p>of the uuid</p>
  * @returns <ul>
  * <li>build uuid</li>
  * </ul>
  */
  function uuid(start?: number): string

  /**
  * <p>Waits for check method to return true before calling onFinish
  * <br/>Will call the passed in checkMethod x (amount) number of times before failing
  * <br/>Will wait x ( wait ) milliseconds between calls to the check method</p>
  * @param args.check - <p>checks if onFinished should be called ( returns true )</p>
  * @param args.onFinish - <p>called when check methods returns true</p>
  * @param [args.amount = 4] - <p>Amount of times to call the check before failing</p>
  * @param [args.wait = 1000] - <p>Time to wait between each check</p>
  * @param [...args] - <p>Arguments to pass to the check, and onFinish methods</p>
  * @returns <ul>
  * <li>Resolves to the response from onFinish</li>
  * </ul>
  */
  function waitForIt(
    waitArgs:{
      check: (...params:any[]) => boolean,
      onFinish: (...params:any[]) => any,
      amount?:number,
      wait?:number,
      total?:number
  },
    ...params:any[]
  ): Promise<any>

  /**
  * <p>Loop over the passed in ENVs, and add them to the current process
  * Add them to the process.env if they don't already exist</p>
  * @param addEnvs - <p>Envs to add to the current process</p>
  * @param options - <p>Configure out the envs are added</p>
  * @param options.force - <p>Force add the env, even if it already exists</p>
  */
  function addToProcess(addEnvs: any, options: {
      force: boolean;
  }): void;

  /**
  * <p>Searches for a currently process by name, and returns it if found</p>
  * @param procName - <p>The executable name to check</p>
  * @param opts - <p>Options to configure how the method runs</p>
  * @returns <ul>
  * <li>Status of the found process</li>
  * </ul>
  */
  function findProc<T=any>(procName: string, opts: any): T;
  function findProc(procName: string, opts: any): any;

  /**
  * <p>Gets and normalizes the current operating system</p>
  * @returns <ul>
  * <li>The current operating system</li>
  * </ul>
  */
  function getOS(): string;

  /**
  * <p>Wraps a method with try catch, and returns false when it throws</p>
  * @param cb - <p>Method to wrap try catch around</p>
  * @returns <p>true if the cb returns a truthy response</p>
  */
  function tryCatch(cb: (...params: any[]) => any): boolean;

  /**
  * <p>Checks if the /.dockerenv file exists</p>
  * @returns <p>true if the check for /.dockerenv does not throw</p>
  */
  function dockEnv(): boolean;

  /**
  * <p>Checks if docker is in the process group</p>
  * @returns <p>true if the docker group exists</p>
  */
  function docGroup(): boolean;

  /**
  * <p>Checks if the current process is running in a docker container</p>
  * @returns <p>true if running in a docker container</p>
  */
  function inDocker(): boolean;

  /**
  * <p>Gets the relative path from the passed in pathToModule</p>
  * @param pathToModule - <p>Location to get the relative path from</p>
  * @returns <ul>
  * <li>Update pathToModule string as a relative path</li>
  * </ul>
  */
  function getRelativePath(pathToModule: string): string;

  /**
  * <p>Use nodes require method to load a module by file path.
  * <br/>Use the rootDir to load the module if it's passed in
  * <br/>If rootDir + pathToModule fails, will try to load the module without the rootDir</p>
  * @param pathToModule - <p>Path to the module to load</p>
  * @param config - <p>settings to load the module</p>
  * @param config.rootDir - <p>root directory to load the module from</p>
  * @param config.logErrors - <p>should require errors be logged</p>
  * @returns <ul>
  * <li>Loaded module</li>
  * </ul>
  */
  function requireModule(pathToModule: string, config: {
      rootDir: string;
      logErrors: boolean;
  }): any | ((...params: any[]) => any);

  /**
  * <p>Checks if the module is a function and calls it
  * <br/>Or if it's an object return it</p>
  * @param foundModule - <p>module loaded from require</p>
  * @param params - <p>arguments to pass to the module if it's a function</p>
  * @returns <ul>
  * <li>Loaded modules or undefined</li>
  * </ul>
  */
  function loadByType(foundModule: any | any[] | ((...params: any[]) => any), params: any): any;

  /**
  * <p>Loops through the pathsToModule array trying to require them</p>
  * @param pathsToModule - <p>Potential paths to a module</p>
  * @param config - <p>settings to load the module</p>
  * @param config.rootDir - <p>root directory to load the module from</p>
  * @param config.logErrors - <p>should require errors be logged</p>
  * @param params - <p>Arguments to pass the the module when called if it's a function</p>
  * @returns <ul>
  * <li>Loaded module object</li>
  * </ul>
  */
  function loopLoad(pathsToModule: any[], config: {
      rootDir: string;
      logErrors: boolean;
  }, params: any[]): any;

  /**
  * <p>Use nodes require method to load a module by file path.
  * <br/>If the path does not exist check the altPaths to see if any of those paths exist
  * <br/>If it's a function call it and pass in the params array
  * <br/>Module path is relative to the caller, NOT this function file location!</p>
  * @example
  * const packageConfig = loadModule('../package.json')
  * @example
  * const packageConfig = loadModule([ './package.json', '../package.json', '../../package.json', ])
  * @example
  * const packageConfig = loadModule([ './package.json' ], { rootDir: 'path to root directory' })
  * @example
  * const packageConfig = loadModule([ './functionModule' ], {}, param1, param2, param2)
  * // Module will be called if it's a function, and param1, param2, param2 will be passed in
  * @param pathsToModule - <p>Potential paths to a module</p>
  * @param [config] - <p>settings to load the module</p>
  * @param [config.rootDir] - <p>root directory to load the module from</p>
  * @param [config.logErrors] - <p>should require errors be logged</p>
  * @param params - <p>Arguments to pass the the module when called if it's a function</p>
  * @returns <ul>
  * <li>Loaded module object</li>
  * </ul>
  */
  function loadModule(pathsToModule: string[] | string, config?: {
      rootDir?: string;
      logErrors?: boolean;
  }, ...params: (any[] | undefined)[]): any;

  /**
  * <p>Tries to synchronously require the path, returning null if unable to.
  * Does not throw.</p>
  * @example
  * const module = tryRequireSync('/keg/tap/foo/bar.js')
  * if (!module) console.log('bar.js module does not exist')
  * @param filePath - <p>path to file. You should use an absolute path</p>
  * @returns <p>the at path, if it exists, null otherwise</p>
  */
  function tryRequireSync<T=any>(filePath: string): T;

  /**
  * <p>Tries to asynchronously require the path, returning null if unable to.
  * Does not throw.</p>
  * @example
  * const module = await tryRequire('/keg/tap/foo/bar.js')
  * if (!module) console.log('bar.js module does not exist')
  * @param filePath - <p>path to file. You should use an absolute path</p>
  * @returns <p>the at path, if it exists, null otherwise</p>
  */
  function tryRequire<T=any>(filePath: string): Promise<T>;

  /**
  * <p>Checks if a value is NaN.</p>
  * @example
  * equalsNaN(NaN)
  * // Returns true
  * @example
  * equalsNaN(1)
  * // Returns false
  * @example
  * equalsNaN('')
  * // Returns false
  * @param val - <p>value to check if is NaN</p>
  * @returns <p>T/F - if value is a number</p>
  */
  function equalsNaN(val: number): boolean;

  /**
  * <p>Gets numbers and floats (.) from a string.</p>
  * @example
  * getNums('$1.23')
  * // Returns '1.23'
  * @param val - <p>value to pull numbers from</p>
  * @returns <p>Numbers found in value</p>
  */
  function getNums(val: any): string;

  /**
  * <p>Checks if a number is a Float.</p>
  * @example
  * isFloat(1.23)
  * // Returns true
  * @example
  * isFloat('1.2')
  * // Returns false ( because it's a string )
  * @param num - <p>value to check</p>
  * @returns <p>true or false - value is an Float</p>
  */
  function isFloat<T=number>(val: any): val is T;

  /**
  * <p>Checks if a number is an integer.</p>
  * @example
  * isInt(1)
  * // Returns true
  * @example
  * isInt('1')
  * // Returns false ( because it's a string )
  * @param num - <p>value to check</p>
  * @returns <p>true or false - value is an Int</p>
  */
  function isInt<T=number>(val: any): val is T;

  /**
  * @example
  * isNegative(-1) // true
  * @example
  * isNegative(0) // false
  * @returns <p>true if x is a negative number</p>
  */
  function isNegative<T=number>(val: any): val is T;

  /**
  * <p>Checks if val is a non-negative number</p>
  * @example
  * isNonNegative(0) // true
  *  isNonNegative(1) // true
  *  isNonNegative(-1) // false
  * @param val - <p>To be checked it it's a non-negative number</p>
  * @returns <ul>
  * <li>True if val is non negative number</li>
  * </ul>
  */
  function isNonNegative<T=number>(val: any): val is T;

  /**
  * <p>Checks is value is a number.</p>
  * @example
  * isInt(1)
  * // Returns true
  * @example
  * isInt(NaN)
  * // Returns false
  * @example
  * isInt('1')
  * // Returns false ( because it's a string )
  * @param val - <p>value to check if is a number</p>
  * @returns <p>T/F - if value is a number</p>
  */
  function isNum<T=number>(val: any): val is T;

  /**
  * @example
  * isPositive(0) // false
  * @example
  * isPositive(1) // true
  * @returns <p>true if x is a positive number</p>
  */
  function isPositive<T=number>(val: any): val is T;

  /**
  * <p>Returns the result of evaluation <code>num</code> modulo <code>divisor</code>.
  * Javascript's built-in modulo (%) operator does not process values
  * correctly when they are negative. This works properly with
  * negatives numbers.</p>
  * @example
  * -1 % 10      // -1
  * mod(-1, 10)  // 9
  * @returns <p>the modulo result. Should be equivalent to
  * return values from the <code>%</code> operator, except with negative <code>num</code> values.</p>
  */
  function mod(num: number, divisor: number): number;

  /**
  * <p>Finds the number ext base on the passed in number.</p>
  * @example
  * nth(1)
  * // Returns 'st'
  * @example
  * nth(2)
  * // Returns 'nd'
  * @example
  * nth(5)
  * // Returns 'th'
  * @param num - <p>value to check</p>
  * @returns <p>ext of the number</p>
  */
  function nth(num: number): string;

  /**
  * <p>Converts passed in value to a float.</p>
  * @example
  * toFloat('1.34')
  * // Returns 1.34
  * @example
  * toFloat(NaN)
  * // Returns 0
  * @param val - <p>value to convert</p>
  * @returns <p>value converted to an float</p>
  */
  function toFloat(val: any): number;

  /**
  * <p>Converts passed in value to an integer.</p>
  * @example
  * toInt('1')
  * // Returns 1
  * @example
  * toInt(NaN)
  * // Returns 0
  * @param val - <p>value to convert</p>
  * @returns <p>value converted to a integer</p>
  */
  function toInt(val: any): number;

  /**
  * <p>Converts passed in value to a number.</p>
  * @example
  * toNum("23")
  * // Returns 23
  * @example
  * toNum(NaN)
  * // Returns 0
  * @param val - <p>value to convert</p>
  * @returns <p>value converted to a float</p>
  */
  function toNum(val: any): number;

  /**
  * <p>Deep clones Object obj, then returns the result of calling function mutatorCb with the clone as its argument</p>
  * @example
  * const obj = {}
  * const clone = applyToCloneOf(obj, (clone) => { clone.test = 'foo'; return clone })
  * console.log(obj === clone) // prints false
  * console.log(clone.test === 'foo') // prints true
  * @param obj - <p>object</p>
  * @param mutatorCb - <p>a callback that accepts one argument, the cloned obj, and mutates it in some way</p>
  * @returns <p>the mutated clone</p>
  */
  function applyToCloneOf(obj: Record<any, any>, mutatorCb: (obj:Record<any, any>) => void): Record<any, any>;

  /**
  * <p>Removes all properties from an object.</p>
  * @param obj - <p>object to remove properties from</p>
  * @param [filter] - <p>list of keys to not remove</p>
  */
  function clearObj(obj: Record<any, any>, filter?: string[]): void;

  /**
  * <p>Clones an object by converting to JSON string and back.</p>
  * @param obj - <p>object to clone</p>
  * @returns <p>copy of original object</p>
  */
  function cloneJson<T=any>(obj: any): T;
  function cloneJson(obj: any): any;

  /**
  * <p>Recursively freezes and object.</p>
  * @returns <ul>
  * <li>frozen Object</li>
  * </ul>
  */
  function deepFreeze<T=Record<any, any>>(obj: Record<any, any>): T;


  /**
  * <p>Creates a consistent hash string from the passed in object or array.</p>
  * @returns <ul>
  * <li>hash string</li>
  * </ul>
  */
  function hashObj(obj: Record<any, any>): string;

  /**
  * <p>Deep merges an array of objects together.</p>
  * @param sources - <p>array of objects to join</p>
  * @returns <ul>
  * <li>merged object or array</li>
  * </ul>
  */
  function deepMerge<T=any>(...sources: any[]): T;
  function deepMerge(...sources: any[]): Record<any, any> | any[];

  /**
  * <p>Returns the first param if correct type of second param.</p>
  * @param obj1 - <p>return if is object</p>
  * @param obj2 - <p>use if first is not an object</p>
  */
  function eitherObj<T>(obj1?: T, obj2?: T): T;
  function eitherObj<T, M>(obj1?: T, obj2?: M): T | M;
  function eitherObj(obj1?: Record<any, any>, obj2?: any): any;

  /**
  * <p>Like &quot;every&quot; for arrays, but operates across each entry in an object</p>
  * @param obj - <p>Object to the it's entries iterated on</p>
  * @param predicate - <p>Function of form (key, value) =&gt; boolean. Returns true or false for the entry</p>
  * @returns <ul>
  * <li>boolean indicating that every entry satisfied the predicate or not</li>
  * </ul>
  */
  function everyEntry(obj: Record<any, any>, predicate: (...params: any[]) => any, logError?:boolean): boolean;

  /**
  * <p>Returns a new object, consisting of every key-value pair from obj that, when passed into the predicate, returned true</p>
  * @param obj - <p>Object that should have it's properties filtered</p>
  * @param predicate - <p>function of form: (key, value) =&gt; boolean</p>
  * @returns <ul>
  * <li>Object consisting of a subset of the entries from obj</li>
  * </ul>
  */
  function filterObj<T=Record<any, any>>(obj: Record<any, any>, predicate: (key:string, value:string) => boolean, logError?:boolean): T;

  /**
  * <p>Checks if prop exists on the object.</p>
  * @param obj - <p>data to check</p>
  * @param prop - <p>prop to check for</p>
  * @returns <p>T/F if the prop exists</p>
  */
  function hasOwn(obj: Record<any, any>, prop: string): boolean;

  /**
  * <p>Returns true if the input is an object and every value is an array</p>
  * @param obj - <p>data to check</p>
  * @returns <ul>
  * <li>true if input is an array map</li>
  * </ul>
  */
  function isArrMap(obj: any): obj is Record<any, any[]>;

  /**
  * <p>Checks if the input is a valid entry - a 2-element array, like what Object.entries produces.
  * Expects the first element in the entry to be either a string or a number.</p>
  * @example
  * isEntry([1, 2]) // true
  * @example
  * isEntry(["id", 87]) // true
  * @example
  * isEntry([new Date(), 2]) // false, first element not string or number
  * @example
  * isEntry([1, 2, 3]) // false, too many elements
  * @param maybeEntry - <p>Item to check if it's an entry</p>
  * @returns <ul>
  * <li>True if it is an entry, false otherwise</li>
  * </ul>
  */
  function isEntry<T=any,V=any>(maybeEntry: any): maybeEntry is [T, V];

  /**
  * <p>Checks if data is an object and not an array.</p>
  * @param obj - <p>data to check</p>
  */
  function isObj<T=Record<any, any>>(obj: any): obj is T;

  /**
  * <p>Compares two objects by converting to JSON, and checking string equality.</p>
  * @param one - <p>object to compare with param two</p>
  * @param two - <p>object to compare with param one</p>
  * @returns <p>status of equality</p>
  */
  function jsonEqual(one: any, two: any): boolean;

  /**
  * <p>Converts an array of strings to a matching key/value pair object.</p>
  * @param arr - <p>to be converted to object</p>
  * @param toUpperCase - <p>converts the key and value to uppercase</p>
  * @returns <p>built object</p>
  */
  function keyMap<T=Record<string, string>>(arr: string[], toUpperCase?: boolean): T;

  /**
  * <p>Returns a new object, each entry of which is the result of applying the cb function to input's corresponding entry</p>
  * @example
  * mapObj({a: 2, b: 3}, (k, v) => [k, v * v]) returns: {a: 4, b: 9}
  * @example
  * mapObj({a: 1}, (k, v) => ['b', v]) returns: {b: 1}
  * @param obj - <p>regular object or array</p>
  * @param cb - <p>function of form: (key, value) =&gt; [nextKey, nextValue]</p>
  * <ul>
  * <li>the return type here is an array of two elements, key and value, where <code>key</code> must be either a string or a number</li>
  * <li>if a cb does not return an entry, then the original [key, value] pair that was passed into cb will be used instead</li>
  * </ul>
  * @returns <ul>
  * <li>new object with mapping applied, or the original obj if input was invalid</li>
  * </ul>
  */
  function mapEntries<T=Record<string, any>>(obj: any | any[], cb: (key:string, value:any) => [string, any]): T;

  /**
  * <p>Shortcut helper for mapping just the keys of an object.</p>
  * @param obj - <p>Object to have it's property keys mapped</p>
  * @param keyMapper - <p>Function of shape (key) =&gt; nextKey</p>
  * @returns <ul>
  * <li>The new object with each key mapped to the response of keyMapper</li>
  * </ul>
  */
  function mapKeys<T=Record<string, any>>(obj: Record<string, any>, keyMapper: (key:string) => any): T;

  /**
  * <p>Map over and objects props and values.</p>
  * @returns <ul>
  * @param obj - <p>Object to have it's property keys mapped</p>
  * @param cb - <p>Function of shape (key) =&gt; nextKey</p>
  * <li>returned values from callback</li>
  * </ul>
  */
  function mapObj(obj: Record<string, any>, cb: (key:string, values:string) => any): any[];

  /**
  * <p>Creates a new object from passed in object with keys not defined from array.</p>
  * @param target - <p>object to pull keys from</p>
  * @param keys - <p>keys to not add to new object</p>
  * @returns <p>new object with only keys not in array</p>
  */
  function omitKeys<T=Record<string, any>>(target: Record<string, any>, keys: string[]): T;

  /**
  * <p>Creates a new object from passed in object with keys defined from array.</p>
  * @param obj - <p>object to pull keys from</p>
  * @param keys - <p>keys to add to new object</p>
  * @returns <p>new object with only keys from passed in keys array</p>
  */
  function pickKeys<T=Record<string, any>>(obj: Record<string, any>, keys: string[]): T;

  /**
  * <p>Loop over and objects props and values and reduce to new object.</p>
  * @returns <ul>
  * <li>updated object</li>
  * </ul>
  */
  function reduceObj<T=any>(obj: Record<string, any>, cb: (key: string, value: any, data: any) => any, start?:any): T;

  /**
  * <p>Sanitizes all html strings in an object's properties.</p>
  * @param obj - <p>Object to be sanitize</p>
  * @returns <ul>
  * <li>obj with strings sanitized</li>
  * </ul>
  */
  function sanitizeCopy(obj: Record<string, any>): Record<string, any>;

  /**
  * <p>Like &quot;some&quot; for arrays, but operates across each entry in obj</p>
  * @param obj - <p>Object to have it's properties checked</p>
  * @param predicate - <p>of form (key, value) =&gt; boolean. Returns true or false for the entry</p>
  * @returns <ul>
  * <li>True if at least one entry satisfied the predicate, false if not</li>
  * </ul>
  */
  function someEntry(obj: Record<string, any>, predicate: (key:string, value:string) => boolean, logError?:boolean): boolean;

  /**
  * <p>Creates an intersection of the passed in object, based on the passed in keys</p>
  * @example
  * const [matching, nonMatching] = splitByKeys({ 1: 'match', 2: 'non-matching' }, [ 1 ])
  * matching === { 1: 'match' } === true
  * nonMatching === { 2: 'non-matching' }  === true
  * @param target - <p>object to pull keys from</p>
  * @param keys - <p>keys to not add to new object</p>
  * @returns <ul>
  * <li>First object contains keys matching keys of the keys argument
  * - Second object contains keys not matching keys of the keys argument</li>
  * </ul>
  */
  function splitByKeys<T=Record<string, any>,S=Record<string, any>>(target: Record<string, any>, keys: string[]): [T, S];

  /**
  * <p>Converts an array or string into an object.</p>
  * @param val - <p>to be converted to object</p>
  * @param divider - <p>if string, what divides key from value</p>
  * @param split - <p>if string, what splits each key/value pair</p>
  * @returns <ul>
  * <li>Converted object</li>
  * </ul>
  */
  function toObj<T=Record<string, any>>(val: string[]|string, divider?: string, split?: string): T;

  /**
  * <p>Trims objects string fields.</p>
  * @returns <ul>
  * <li>object with string fields trimmed</li>
  * </ul>
  */
  function trimstringFields(object: Record<string, any>): Record<string, any>;


/**
 * <p>Transforms the keys of an object to a matching key value in keyMap object.</p>
 * <p>Keys not in the keyMap are included as is, unless strict === true option is passed.</p>
 * @example
 * transformKeys({my_key: `1234`, other_key: `4321`}, {my_key: `myKey`}) === { myKey: `1234`, other_key: `4321` }
 * @example
 * const opts = { strict: true }
 * transformKeys({my_key: `1234`, other_key: `4321`}, {my_key: `myKey`}, opts) === { myKey: `1234` }
 */
  function transformKeys<T=Record<string, any>>(
    obj: T,
    keyMap: Record<string, string>,
    opts?: Record<'strict', boolean>,
  ): T;

  /**
  * <p>Converts a standard callback method into Promise</p>
  * @param method - <p>Function to convert into a promise</p>
  * @returns <ul>
  * <li>Passed in method converted into a promise</li>
  * </ul>
  */
  function promisify(method: (...params: any[]) => any): Promise<(...params: any[]) => void>;

  /**
  * <p>Loops an object and looks for any methods that belong to the object, then add an Async version</p>
  * @returns <ul>
  * <li>object with Async methods added</li>
  * </ul>
  */
  function addAsync(object: any): any;

  /**
  * <p>Converts Objects method properties into promiseAsync. allow using promisifyAll</p>
  * @returns <ul>
  * <li>promisified object</li>
  * </ul>
  */
  function promisifyAll(object: any): any;

  /**
  * <p>Stops execution for a given amount of time</p>
  * @param time - <p>Amount of time to wait</p>
  */
  function wait(time: number): void;

  /**
  * <p>Attempts to return a regex string from maybeRx.</p>
  * @example
  * getRegexSource(/[A-z]+/) // '[A-z]+'
  * getRegexSource('test') // 'test'
  * getRegexSource(34) // null
  * @param maybeRx - <p>any time</p>
  * @returns <p>If maybeRx is a RegExp instance, returns its .source
  * property. If it is a string, returns it unchanged.
  * Otherwise, returns null.</p>
  */
  function getRegexSource(maybeRx: any): string;

  /**
  * <p>Checks if value is an instance of regex</p>
  * @example
  * isRegex(new RegExp('a')) // true
  * isRegex(/a/) // true
  * isRegex('a') // false
  * @returns <p>true if val is an instance of RegExp</p>
  */
  function isRegex(val: any): val is RegExp;

  /**
  * <p>Helper for <code>joinRegex</code> that parses the args</p>
  * @returns <p>[
  * expressions array,
  * options string
  * ]</p>
  */
  function parseArgs(...args: any[]): any[];

  /**
  * <p>Joins regex together in one expression
  * <br/>You can technically use strings as well
  * <br/>But be careful that it's not the last element of a spread call
  * <br/>Or that will be interpreted as the &quot;options&quot; string.</p>
  * @example
  * // calling using spread args
  * const joined = joinRegex(/[A-z]+/, /[0-9]/, 'g')
  * joined === /([A-z]+|[0-9])/g
  * @example
  * // calling with an array
  * const joined = joinRegex([ ...allMyRegEx ], 'gi')
  * @param expressions - <p>array of regex instances.</p>
  */
  function joinRegex(...expressions: [RegExp|string]): RegExp;

  /**
  * <p>Builds a string path from passed in args ( i.e. path/to/thing ).</p>
  * @returns <ul>
  * <li>built path from arguments</li>
  * </ul>
  */
  function buildPath(...args: any[]): string;

  /**
  * <p>Converts a string to camel case.</p>
  * @param string - <p>to be converted</p>
  * @returns <ul>
  * <li>string in camel case format</li>
  * </ul>
  */
  function camelCase<T=string>(string: string): T;

  /**
  * <p>Turns a path string into a camel-cased string, if there is more than one
  * step in the path. If there isn't, just returns path.</p>
  * @example
  * camelCasePath('settings.agendaMap.Count') -> 'settingsAgendaMapCount'
  * camelCasePath('settings') -> 'settings'
  * @returns <p>camel-cased string</p>
  */
  function camelCasePath<T=string>(path: string): T;

  /**
  * <p>Converts first letter of a string to be capitalized.</p>
  * @param lowercaseTail - <p>if true, will also lowercase the all characters except the first</p>
  * @returns <ul>
  * <li>Passed in string, but capitalized</li>
  * </ul>
  */
  function capitalize<T=string>(string: string, lowercaseTail?: boolean): T;

  /**
  * <p>Converts <code>-</code> and <code>_</code> to white space and calls remove removeDot, to remove a period.</p>
  * @param string - <p>to be converted</p>
  * @returns <ul>
  * <li>cleaned string</li>
  * </ul>
  */
  function cleanStr<T=string>(string: string): T;

  /**
  * <p>Checks if a string contains another string.</p>
  * @param string - <p>value to be checked</p>
  * @param substring - <p>value to search for</p>
  * @returns <ul>
  * <li>if the substring exists string</li>
  * </ul>
  */
  function containsStr(string: string, substring: string, fromIndex?: number): boolean;

  /**
  * <p>Converts a string into a delimted script based on the passed in arguments</p>
  * @example
  * delimitstring('fooBar', '_') === 'foo_Bar'
  * @param str - <p>string of any casing</p>
  * @param delimiter - <p>How the string should be split e.g. '_'</p>
  * @param [delimiters] - <p>An array of delimiter characters on which this function searches and breaks.<br/>Defaults to checking -, _, and space</p>
  * @returns <ul>
  * <li>A new string with the specified delimiter delimiting each word</li>
  * </ul>
  */
  function delimitstring<T=string>(str: string, delimiter: string, delimiters?: string[]): T;

  /**
  * <p>Checks if the first param is a string, and returns it.
  * <br/>If it's not a string, the second param is returned</p>
  * @param str1 - <p>return if is string</p>
  * @param str2 - <p>use if first is not a string</p>
  */
  function eitherStr<T=string>(str1?: any, str2?: any): T;

  /**
  * <p>Gets the word in text ending at index (exclusive)</p>
  * @example
  * const text = 'foo bar bin'
  * const word = getWordEndingAt(text, 3)
  * word === 'foo'
  * @param index - <p>the exclusive ending index of the word to get</p>
  * @param delimiters - <p>optional array of strings that delimit the start of words. Defaults to the space character.</p>
  */
  function getWordEndingAt<T=string>(text: string, index: number, delimiters?: string[]): T;

  /**
  * <p>Helper for <code>getWordStartingAt</code> that finds the
  * index of the exclusive end of the word, given the available
  * ending delimiters</p>
  */
  function getNearestDelimiterIndex<T=string>(text: string, index: number, delimiters?: string[]): T;

  /**
  * <p>Gets the word in text starting at index</p>
  * @example
  * const text = 'foo bar bin'
  * const word = getWordStartingAt(text, 4)
  * word === 'bar'
  * @param index - <p>the inclusive starting index of the word to get</p>
  * @param delimiters - <p>optional array of strings that delimit words. Defaults to the space character.</p>
  */
  function getWordStartingAt<T=string>(text: string, index: number, delimiters?: string[]): T;

  /**
  * <p>Creates a hash from a passed in string consistently
  * <br/>Not intended to be secure
  * <br/>Value comes from being a pure function
  * <br/>Given the same input, it will always return the same output
  * <br/>There is no expectation to convert back from the hash to the original string</p>
  * @param str - <p>string to be hashed</p>
  * @param [maxLength] - <p>Max length of the returned hash</p>
  * @returns <ul>
  * <li>Hashed version of the string</li>
  * </ul>
  */
  function hashstring<T=string>(str: string, maxLength?: number): T;

  /**
  * <p>Converts a camelCase style rule into a hyphenated style rule
  * <br/>Caches the response to make future conversions faster</p>
  * @param str - <p>camelCase style rule rule</p>
  * @returns <ul>
  * <li>Hyphenated style rule</li>
  * </ul>
  */
  function hyphenator<T=string>(str: string): T;

  /**
  * <p>Check if string is a email.</p>
  * @param string - <p>to check</p>
  * @returns <ul>
  * <li>if it's a email</li>
  * </ul>
  */
  function isEmail<T extends string=string>(string: string):string is T;

/**
 * Check if string is an Ip address, both Ip4 and Ip6
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's an Ip address
 */
  function isIp<T extends string=string>(string: string):string is T;

/**
 * Check if string is an IP4 address
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's an IP4 address
 */
  function isIp4<T extends string=string>(string: string):string is T;

/**
 * Check if string is an IP6 address
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's an IP6 address
 */
 function isIp6<T extends string=string>(string: string):string is T;


  /**
  * <p>Checks if a string is all lowercase letters</p>
  * @param str - <p>string to check if it's lowercase</p>
  * @returns <ul>
  * <li>True if str is lowercase</li>
  * </ul>
  */
  function isLowerCase<T extends string=string>(str: string): str is T;

  /**
  * <p>Check if string is a phone number.</p>
  * @param str - <p>string to check</p>
  * @returns <ul>
  * <li>True if str is a phone number</li>
  * </ul>
  */
  function isPhone<T extends string=string>(str: string): str is T;

  /**
  * <p>Checks if the string contains quoted text</p>
  * @example
  * isQuoted('foo') // false
  * @example
  * isQuoted('"foo"') // true
  * @param str - <p>string to check</p>
  * @param quotes - <p>optional array of valid quote strings to check with. Defaults to single and double quote characters.</p>
  * @returns <p>true if <code>str</code> is a quoted string</p>
  */
  function isQuoted<T extends string=string>(str: string, quotes?: string[]): str is T;

  /**
  * <p>Check if passed in value is a string.</p>
  * @param str - <p>param to check if type is a string</p>
  * @returns <ul>
  * <li>True if it's a string</li>
  * </ul>
  */
  function isStr<T=string>(str: any): str is T;

  /**
  * <p>Checks if a string is all capital letters</p>
  * @param str - <p>string to check if it's uppercase</p>
  * @returns <ul>
  * <li>True if str is uppercase</li>
  * </ul>
  */
  function isUpperCase<T extends string=string>(str: string): str is T;

  /**
  * <p>Check if string is a url.</p>
  * @param string - <p>to check</p>
  * @returns <ul>
  * <li>if it's a url</li>
  * </ul>
  */
  function isUrl<T extends string=string>(str: string): str is T;

  /**
  * <p>Check if string is a uuid.</p>
  * @param str - <p>string to check</p>
  * @returns <ul>
  * <li>if it's a uuid</li>
  * </ul>
  */
  function isUuid<T extends string=string>(str: string): str is T;

  /**
   * <p>Maps a string by applying function <code>charMapper</code> to each character.</p>
   * @example
   * mapstring("hello", c => c === 'h' ? 'x' : c) // returns 'xello'
   * @param str - <p>string to be mapped</p>
   * @param charMapper - <p>Function of form (character) =&gt; <some character or string></p>
   * @returns <ul>
   * <li>string with each character mapped by charMap.<br/>If str is not a string or charMapper not a function, just returns the passed in str argument</li>
   * </ul>
   */
  function mapstring(str: string, charMapper: (char:string) => any): string;

  /**
   * <p>Convert JSON string into object, wrapped in a try / catch.</p>
   * @returns <ul>
   * <li>JSON object</li>
   * </ul>
   */
  function parseJSON<T=any>(string: string, throwErr?:boolean): T;

  /**
   * <p>Adds an <code>s</code> to the end of a string, if one does not exist.</p>
   * @param str - <p>string to convert</p>
   * @returns <p>string as a plural</p>
   */
  function plural<T=string>(str: string): T;

  /**
   * <p>Removes a <code>.</code> from the start and end of a string.</p>
   * @param str - <p>string to convert</p>
   * @returns <ul>
   * <li>string without the <code>.</code></li>
   * </ul>
   */
  function removeDot<T=string>(str: string): T;

  /**
   * Remove single and double quotes from a string's starting and ending
   * @param {string} str - string containing single or double quotes at the start and end
   *
   * @returns {string} - Passed in arg string with start and end quotes removed
   */
  function removeQuotes<T=string>(str:string): T;

  /**
   * <p>Reverses string</p>
   * @example
   * reverseStr('foo') // 'oof'
   * @param str - <p>string to reverse</p>
   * @returns <p>reversed str</p>
   */
  function reverseStr<T=string>(str: string): T;

  /**
  * <p>Sanitize a string of HTML content.</p>
  * @returns <ul>
  * <li>cleaned string</li>
  * </ul>
  */
  function sanitize<T=string>(string: string): T;

  /**
  * <p>Remove an <code>s</code> at the end of a string, if the last char is an <code>s</code>,</p>
  * @param str - <p>string to convert</p>
  * @returns <p>string as singular</p>
  */
  function singular<T=string>(str: string): T;

  /**
  * <p>Converts a string to snake_case.</p>
  * @example
  * snakeCase('fooBar') === 'foo_bar'
  * @param str - <p>string to be converted</p>
  * @returns <ul>
  * <li>The string in snake_case, or the input if it is not a string</li>
  * </ul>
  */
  function snakeCase<T=string>(str: string): T;

  /**
  * <p>Joins strings and array of string together with spaces</p>
  * @param original - <p>The default string that other strings get added to</p>
  * @param toAdd - <p>string of Array of strings to add to the original</p>
  * @returns <p>Joined strings seperated by space</p>
  */
  function spaceJoin<T=string>(str: string, toAdd: string | string[]): T;

  /**
  * <p>Converts a string to css in js format.
  * Useful for converting css rules into js format, I.E. margin-top =&gt; marginTop.</p>
  * @param str - <p>string to be converted</p>
  * @returns <ul>
  * <li>string in style case format</li>
  * </ul>
  */
  function styleCase<T=string>(str: string): T;

  /**
  * <p>Helper to wrap the template method, and allow passing a custom regex argument.<br/>
  * Custom regex is used instead the default regex of the template method</p>
  * @example
  * templateRx('${ who } in ${ where }!', { who: 'goats', where: 'boats' }, ``, /\[\[.*?\]\]]/g)
  * // Returns "goats in boats"
  * @param template - <p>string with ES6 syntax items to be replaced</p>
  * @param data - <p>Data used to replace the ES6 placeholders</p>
  * @param fallback - <p>Used it data does not contain key to be replaced</p>
  * @param rx - <p>Custom regular expression to override the default</p>
  * @returns <ul>
  * <li>template with placeholder values filled</li>
  * </ul>
  */
  function templateRx<T=string>(template: string, data: Record<any, any>|any[], fallback?: any, rx?:RegExp):T

  /**
  * <p>Simple template replace for ES6 template strings</p>
  * @example
  * template('${ who } in ${ where }!', { who: 'goats', where: 'boats' })
  * // Returns "goats in boats"
  * @param template - <p>string with ES6 syntax items to be replaced</p>
  * @param data - <p>Data used to replace the ES6 placeholders</p>
  * @param fallback - <p>Used it data does not contain key to be replaced</p>
  * @returns <ul>
  * <li>template with placeholder values filled</li>
  * </ul>
  */
  function template<T=string>(template: string, data: Record<any, any>|any[], fallback?: any): T;

  /**
  * <p>Converts a passed in value to a string.</p>
  * @param val - <p>value to be converted</p>
  * @returns <ul>
  * <li>value converted into a string</li>
  * </ul>
  */
  function toStr<T=string>(val: any): T;
  
  /**
  * <p>Converts a string to train case, I.E. marginTop =&gt; margin-top.</p>
  * @param string - <p>to be converted</p>
  * @returns <ul>
  * <li>string in train case format</li>
  * </ul>
  */
  function trainCase<T=string>(string: string): T;
  

  /**
  * <p>Checks whether a given string is a valid filename</p>
  * @param fileName - <p>The file name to check if valid</p>
  */
  function validFilename(fileName: string): boolean;

  /**
  * <p>Converts all words in a string to be capitalized.</p>
  * @param string - <p>to be converted</p>
  * @returns <ul>
  * <li>string with all words capitalized</li>
  * </ul>
  */
  
  function wordCaps<T=string>(string: string): T;


  /**
  * <p>Gets the value for the URL parameter, if it's available.
  * Can be safely called on platforms without a global document object,
  * in which case this always returns null.</p>
  * @example
  * for www.test.com/?x=1&y=2
  * getURLParam('x') // 1
  * getURLParam('y') // 2
  * @param paramKey - <p>a url param key</p>
  * @returns <ul>
  * <li>value for the url parameter</li>
  * </ul>
  */
  function getURLParam<T=string>(paramKey: string): T;

  /**
  * <p>Checks if the given string is a valid URL
  * Must begin with ftp/http/https</p>
  * @param string - <p>any string to check if it's a valid url</p>
  */
  function isValidUrl<T extends string=string>(string: string): string is T;

  /**
  * <p>Converts the input object to url querystring</p>
  * @param obj - <p>object with kvp to convert into a querystring</p>
  * @returns <p>querystring</p>
  */
  function objToQuery<T=string>(obj: Record<string, any>): T;

  /**
  * <p>takes a raw querystring input and converts it to an object</p>
  * @param string - <p>querystring to parse into an object</p>
  */
  function queryToObj<T=Record<string, any>>(string: string): T;


  /**
  * <p>Validates each key-value entry in argObj using the validator functions in validators with matching keys.
  * <br/>For any failures, validate will console.error the reason.</p>
  * @example
  * const elements = {}
  *    const name = 'michael'
  *    const address = '12345 E. Street'
  *    const [ isValid, results ] = validate(
  *      { elements, name, address },
  *      { elements: isArr, $default: isStr }
  *    )
  *    console.log(isValid) // false
  *    console.log(results.elements.success) // false
  * @param argObj - <p>object, where keys are the name of the argument to validate, and value is its value</p>
  * @param validators - <p>object, where keys match the argument and values are predicate functions (return true/false and are passed the arg with the same key).
  * - Use the <code>$default</code> key to define a default validator, which will validate any argument that doesn't have a custom validator defined.</p>
  * @param options - <p>contains <code>logs</code>, <code>throws</code>, and <code>prefix</code> props. When a validation fails, it will throw an error if <code>throws</code> is true. Else it logs error if <code>logs</code> is true. <code>prefix</code> prepends a string to the error messages.</p>
  * @returns <ul>
  * <li>An entry with two values [ success, results ].<br/>
  * <ul>
  * <li>success: { boolean } that is true if all arguments passed their validators, false otherwise<br/></li>
  * <li>results: {Object} that holds the validation results for each argument, keyed by the same keys as in argObj. For each
  * result object, the properties are: { success, key, value, validator, reason }.</li>
  * </ul>
  * </li>
  * </ul>
  */
  function validate(
    argObj: Record<string, any>,
    validators: Record<string, any>,
    options: {
      logs?: boolean,
      throws?: boolean,
      prefix?: string,
    }
  ): [
    success:boolean,
    results:{
      success: boolean,
      key: string,
      value: any,
      validator: any,
      reason: string
    }
  ];

  /**
  * Formats the passed in classes argument into a space separated string of classNames
  * @param {Object|Array<string>|string} classes - Classes that should be formatted
  * @example
  * cls({ class1: true, class2: false }) === `class1`
  * cls({ class1: true, class2: true }) === `class1 class2`
  * @example
  * let class2Active = false
  * cls([`class1`, class2Active && `class2`]) === `class1`
  * class2Active = true
  * cls([`class1`, class2Active && `class2`]) === `class1 class2`
  * @example
  * cls(`class1`, `class2`, [`class3`], { class4: true }) === `class1 class2 class3 class4`
  * @returns {string} - Formatted class names 
  */
  function cls(...classes: TClsItems[]): string;

  type TClsTypes = string | boolean | undefined;
  type TClsItems = string | boolean | Record<string, TClsTypes[]> | TClsTypes[] | undefined;



  /**
  * Gets the paths from a stacktrace as CallSites and returns them
  * @param {Array|Function} filter - List of paths to ignore, or function that returns truthy to ignore
  *
  * @returns {Array<string>} - List of paths from the stackTrace
  */
  function stackTracePaths(filter?:string[]|((location:string,cs?:Record<any, any>,stack?:Record<any, any>[])=> boolean)):string[];


  /**
  * Converts the local part of the passed in location to an absolute path
  * @param {string} location - Path to be resolved
  *
  * @returns {string} - Resolved location
  */
  function resolvePath(location:string, rootDir?:string):string;


  /**
  * When called, if calls original function, then returns inverse of the functions result
  * Should be used with functions that return a boolean
  * @param {Function} func - Function call and invert its response
  *
  * @returns {Function} - Calls the passed in function then returns True if the passed in function returns falsy, otherwise false
  */
  function not(func:(...args:any[]) => any):(...arg:any[]) => boolean;
  export namespace not {
    function bool(...args:any[]): boolean;
    function strBool(...args:any[]): boolean;
    function coll(...args:any[]): boolean;
    function deepEqual(...args:any[]): boolean;
    function emptyColl(...args:any[]): boolean;
    function dom(...args:any[]): boolean;
    function exists(...args:any[]): boolean;
    function empty(...args:any[]): boolean;
    function same(...args:any[]): boolean;
    function validDate(...args:any[]): boolean;
    function func(...args:any[]): boolean;
    function identity(...args:any[]): boolean;
    function orderable(...args:any[]): boolean;
    function equalsNaN(...args:any[]): boolean;
    function float(...args:any[]): boolean;
    function int(...args:any[]): boolean;
    function num(...args:any[]): boolean;
    function negative(...args:any[]): boolean;
    function positive(...args:any[]): boolean;
    function hasOwn(...args:any[]): boolean;
    function entry(...args:any[]): boolean;
    function arrMap(...args:any[]): boolean;
    function obj(...args:any[]): boolean;
    function jsonEqual(...args:any[]): boolean;
    function regex(...args:any[]): boolean;
    function email(...args:any[]): boolean;
    function ip(...args:any[]): boolean;
    function lowerCase(...args:any[]): boolean;
    function phone(...args:any[]): boolean;
    function quoted(...args:any[]): boolean;
    function str(...args:any[]): boolean;
    function upperCase(...args:any[]): boolean;
    function url(...args:any[]): boolean;
    function uuid(...args:any[]): boolean;
    function validUrl(...args:any[]): boolean;
  }

}
