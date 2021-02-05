import store from '../../store'
import {
  UNIQUE_PROPERTY,
  LOW_LEVEL_PROPERTIES,
  LABEL_PROPERTY,
  OWL_ANNOTATION_PROPERTIES
} from '../../constants/graph'
/**
 * Update ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node ID
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @return {undefined}
 */
const setOntologyUpdateNode = ({
  selectedElement,
  setStoreState,
  selectedElementProperties,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    updatedNodes,
    selectedGraphVersion,
    availableNodes,
    availableNodesNormalised
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      if (LOW_LEVEL_PROPERTIES.includes(propertyKey)) {
        newClassesFromApi[selectedElement][propertyKey] = selectedElementProperties[propertyKey]
      } else {
        if (!newClassesFromApi[selectedElement][OWL_ANNOTATION_PROPERTIES]) {
          newClassesFromApi[selectedElement][OWL_ANNOTATION_PROPERTIES] = {}
        }

        newClassesFromApi[selectedElement][OWL_ANNOTATION_PROPERTIES][propertyKey] = selectedElementProperties[propertyKey]
      }

      if (propertyKey === LABEL_PROPERTY) {
        newClassesFromApi[selectedElement].label = selectedElementProperties[propertyKey]
        availableNodes.update({ id: selectedElement, label: selectedElementProperties[propertyKey] })
      }
    }

    return true
  })

  const newUpdatedNodes = [
    ...updatedNodes,
    ...[selectedElement]
  ]

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.updatedNodes = newUpdatedNodes
  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('availableNodesNormalised', {
    ...availableNodesNormalised,
    [selectedElement]: {

      ...availableNodesNormalised[selectedElement],
      ...newClassesFromApi[selectedElement]
    }
  })
  setStoreState('updatedNodes', newUpdatedNodes)
}

export default setOntologyUpdateNode
