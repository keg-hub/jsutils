/** @module Dom */

/**
 * Formats the passed in classes
 * @function
 * @private
 */
const formatCls = classes =>
  classes
    .filter(item => typeof item === 'string' && Boolean(item))
    .join(` `)
    .trim()

/**
 * Formats the passed in classes argument into a space separated string of classNames
 * @function
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
export const cls = (...classGroup) => {
  return formatCls(
    classGroup.map(classes => {
      return Array.isArray(classes)
        ? cls(...classes)
        : typeof classes !== `object`
          ? formatCls([classes])
          : formatCls(
            Object.entries(classes).map(([ item, val ]) => {
              return typeof val === 'boolean'
                ? val && formatCls([item])
                : cls(val)
            })
          )
    })
  )
}
