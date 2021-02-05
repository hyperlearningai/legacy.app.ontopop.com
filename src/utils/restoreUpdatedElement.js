import store from '../store'
import {
  OWL_ANNOTATION_PROPERTIES
} from '../constants/graph'
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
    graphVersions,
    selectedGraphVersion,
    annotationProperties,
  } = store.getState()

  const elementProperties = {}

  if (type === 'node') {
    const { classesFromApiBackup } = graphVersions[selectedGraphVersion]
    const nodeBackup = classesFromApiBackup[selectedElement]

    annotationProperties.map((nodeProperty) => {
      if (nodeBackup[nodeProperty]) {
        elementProperties[nodeProperty] = nodeBackup[nodeProperty]
        return true
      }

      if (nodeBackup[OWL_ANNOTATION_PROPERTIES][nodeProperty]) {
        elementProperties[nodeProperty] = nodeBackup[OWL_ANNOTATION_PROPERTIES][nodeProperty]
        return true
      }

      return true
    })
  }

  setSelectedElementProperties(elementProperties)
}

export default restoreUpdatedElement
