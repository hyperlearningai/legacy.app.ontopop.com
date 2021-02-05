import store from '../../store'
import {
  UNIQUE_PROPERTY,
  LOW_LEVEL_PROPERTIES,
  LABEL_PROPERTY,
  OWL_ANNOTATION_PROPERTIES
} from '../../constants/graph'
/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @return {undefined}
 */
const setOntologyAddEdge = ({
  setStoreState,
  selectedElementProperties,
  addToObject
}) => {
  const {
    graphVersions,
    objectPropertiesFromApi,
    selectedGraphVersion,
    addedEdges,
    availableEdgesNormalised,
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  const newNodeId = selectedElementProperties[UNIQUE_PROPERTY]

  newObjectPropertiesFromApi[newNodeId] = {}

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      if (LOW_LEVEL_PROPERTIES.includes(propertyKey)) {
        newObjectPropertiesFromApi[newNodeId][propertyKey] = selectedElementProperties[propertyKey]
      } else {
        if (!newObjectPropertiesFromApi[newNodeId][OWL_ANNOTATION_PROPERTIES]) {
          newObjectPropertiesFromApi[newNodeId][OWL_ANNOTATION_PROPERTIES] = {}
        }

        newObjectPropertiesFromApi[newNodeId][OWL_ANNOTATION_PROPERTIES][propertyKey] = selectedElementProperties[propertyKey]
      }

      if (propertyKey === LABEL_PROPERTY) {
        newObjectPropertiesFromApi[newNodeId].label = selectedElementProperties[propertyKey]
      }
    }

    return true
  })

  const newAddedEdges = [
    ...addedEdges,
    ...[newNodeId]
  ]

  newGraphVersion.objectPropertiesFromApi = newObjectPropertiesFromApi
  newGraphVersion.addedEdges = newAddedEdges

  setStoreState('availableEdgesNormalised', {
    ...availableEdgesNormalised,
    [newNodeId]: {
      ...newObjectPropertiesFromApi[newNodeId],
      id: newNodeId
    }
  })
  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('addedEdges', newAddedEdges)
}

export default setOntologyAddEdge
