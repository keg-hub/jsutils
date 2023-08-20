/** @module Function */

// import { exists } from '@ext/exists'
// import { isObj } from '@object/isObj'

// TODO - Add tests. Method is not included in current export / build due to no tests

/**
 * Helper method to find an item in a list of items
 * Works with Arrays and Objects
 * Item can be an a primitive of a collection ( Object | Array )
 * When item is an Object, a prop can be passed as the third argument to match against the object property
 * @private
 * @param{Object|Array} items - Collection of items to search for a match
 * @param{Object|primitive} item - Item to match against
 * @param{string|number} prop - Property to match against when item is an object
 * @example
 * find([1,2], 1) === 1 // True
 * const data = {id: 2}
 * find([{id: 1},data], data) === data // True - Compares object equality using `===`
 * find([{id: 1},{id: 2}], 2, `id`) === {id: 2} // True - Compares 2 to the id of each in the array
 * find([{id: 1},{id: 2}], {id: 2}, `id`) === {id: 2} // True - Compares the item id to the id of each in the array
 * find({name: 'name'}, {name: 'name'}, `name`) === 'name' // True - Compares the name property and return the matching value
 *
 * find([1,2], 3) === 1 // False, undefined is returned from the find method
 *
 * @returns {*} - Found matching item or undefined
 */

// export const find = (items, item, prop) => {
//   const hasRef = exists(prop)
//   const asObj = isObj(item)

//   return Object.entries(items).reduce((found, [ key, value ]) => {
//     if (found || exists(found)) return found

//     const hasMatch =
//       asObj && hasRef
//         ? value[prop] === item[prop]
//         : hasRef
//           ? value[prop] === item
//           : value === item

//     return hasMatch ? value : found
//   }, undefined)
// }

export {}
