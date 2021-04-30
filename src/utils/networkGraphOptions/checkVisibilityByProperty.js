import checkElementVisibilityByPropertyLogic from './checkElementVisibilityByPropertyLogic'

/**
 * Check visibility by property
 * @param  {Object}   params
 * @param  {Object}   params.element                Element object
 * @param  {Array}    params.properties             Filter properties
 * @return {Boolean}  isVisible                     Element visibility flag
 */
const checkVisibilityByProperty = ({
  element,
  properties
}) => {
  if (properties.length === 0) return false

  let isVisible = true

  const propertiesLength = properties.length - 1

  for (let index = propertiesLength; index >= 0; index--) {
    const property = properties[propertiesLength - index]

    const {
      filterProperties,
      type
    } = property

    if (!isVisible) return isVisible

    if (filterProperties.length === 0) continue

    isVisible = type === 'and'
      ? filterProperties.every((filter) => checkElementVisibilityByPropertyLogic({
        filter,
        element
      })) : filterProperties.some((filter) => checkElementVisibilityByPropertyLogic({
        filter,
        element
      }))
  }

  return isVisible
}

export default checkVisibilityByProperty
