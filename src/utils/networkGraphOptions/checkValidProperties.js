/**
 * Check valid properties
 * @param  {Object}   params
 * @param  {Object}   params.properties             Properties to check
 * @return {Array}    validProperties               Edge visibility flag
 */
const checkValidProperties = ({
  properties
}) => {
  const propertiesKeys = Object.keys(properties)

  if (propertiesKeys.length === 0) return false

  return propertiesKeys.map((propertyKey) => {
    const { properties: filterProperties, type } = properties[propertyKey]

    const filterPropertiesKeys = Object.keys(filterProperties)

    if (filterPropertiesKeys.length === 0) {
      return ({
        type,
        filterProperties: []
      })
    }

    const validProperties = filterPropertiesKeys.map(
      (filterPropertiesKey) => filterProperties[filterPropertiesKey]
    ).filter((filterProperty) => {
      const {
        property, value
      } = filterProperty

      const isValid = property !== '' && value !== ''
      return isValid
    })

    return ({
      type,
      filterProperties: validProperties
    })
  }).filter((property) => property.filterProperties.length > 0)
}

export default checkValidProperties
