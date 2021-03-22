/**
 * Check property visibility
 * @param  {Object}   params
 * @param  {Object}   params.element                Element object
 * @param  {Object}    params.property              Filter property
 * @return {Boolean}  isVisible                     Element visibility flag
 */
const checkElementVisibilityByPropertyLogic = ({
  filter,
  element
}) => {
  const {
    operation,
    property,
    value
  } = filter

  let isValid = false

  if (!element[property]) return isValid

  const lowerCaseValue = value.toLowerCase()

  switch (operation) {
    case 'contains':
      isValid = element[property].toLowerCase().includes(lowerCaseValue)
      break
    case 'equal':
      isValid = element[property].toLowerCase() === lowerCaseValue
      break
    case 'notContains':
      isValid = !element[property].toLowerCase().includes(lowerCaseValue)
      break
    default: // notEqual
      isValid = element[property].toLowerCase() !== lowerCaseValue
      break
  }

  return isValid
}

export default checkElementVisibilityByPropertyLogic
