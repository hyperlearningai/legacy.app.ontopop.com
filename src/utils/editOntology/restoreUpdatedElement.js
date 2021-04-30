import store from '../../store'

/**
 * Set graph full data
 * @param  {Object}         params
 * @param  {Function}       params.setSelectedElementProperties       Set selected element properties function
 * @param  {String}         params.selectedElement                    Element ID
 * @return {undefined}
 */
const restoreUpdatedElement = async ({
  setSelectedElementProperties,
  selectedElement
}) => {
  const {
    classesFromApiBackup,
    annotationProperties,
  } = store.getState()

  const elementProperties = {}

  const nodeBackup = classesFromApiBackup[selectedElement]

  const annotationPropertiesLength = annotationProperties.length - 1

  for (let index = annotationPropertiesLength; index >= 0; index--) {
    const nodeProperty = annotationProperties[annotationPropertiesLength - index]

    if (nodeBackup[nodeProperty]) {
      elementProperties[nodeProperty] = nodeBackup[nodeProperty]
      continue
    }

    if (nodeBackup[nodeProperty]) {
      elementProperties[nodeProperty] = nodeBackup[nodeProperty]
    }
  }

  setSelectedElementProperties(elementProperties)
}

export default restoreUpdatedElement
