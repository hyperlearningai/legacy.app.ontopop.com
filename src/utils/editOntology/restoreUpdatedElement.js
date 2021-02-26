import store from '../../store'

/**
 * Set graph full data
 * @param  {Object}         params
 * @param  {Function}       params.setSelectedElementProperties       Set selected element properties function
 * @param  {String}         params.type                               Element type (node / edge)
 * @param  {String}         params.selectedElement                    Element ID
 * @return {undefined}
 */
const restoreUpdatedElement = async ({
  setSelectedElementProperties,
  type,
  selectedElement
}) => {
  const {
    classesFromApiBackup,
    annotationProperties,
  } = store.getState()

  const elementProperties = {}

  if (type === 'node') {
    const nodeBackup = classesFromApiBackup[selectedElement]

    annotationProperties.map((nodeProperty) => {
      if (nodeBackup[nodeProperty]) {
        elementProperties[nodeProperty] = nodeBackup[nodeProperty]
        return true
      }

      if (nodeBackup[nodeProperty]) {
        elementProperties[nodeProperty] = nodeBackup[nodeProperty]
        return true
      }

      return true
    })
  }

  setSelectedElementProperties(elementProperties)
}

export default restoreUpdatedElement
