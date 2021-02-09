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
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  const newEdgeId = selectedElementProperties[UNIQUE_PROPERTY]

  newObjectPropertiesFromApi[newEdgeId] = {}

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      if (LOW_LEVEL_PROPERTIES.includes(propertyKey)) {
        newObjectPropertiesFromApi[newEdgeId][propertyKey] = selectedElementProperties[propertyKey]
      } else {
        if (!newObjectPropertiesFromApi[newEdgeId][OWL_ANNOTATION_PROPERTIES]) {
          newObjectPropertiesFromApi[newEdgeId][OWL_ANNOTATION_PROPERTIES] = {}
        }

        newObjectPropertiesFromApi[newEdgeId][OWL_ANNOTATION_PROPERTIES][propertyKey] = selectedElementProperties[propertyKey]
      }

      if (propertyKey === LABEL_PROPERTY) {
        newObjectPropertiesFromApi[newEdgeId].label = selectedElementProperties[propertyKey]
      }
    }

    return true
  })

  const newAddedEdges = [
    ...addedEdges,
    ...[newEdgeId]
  ]

  newGraphVersion.objectPropertiesFromApi = newObjectPropertiesFromApi
  newGraphVersion.addedEdges = newAddedEdges

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('addedEdges', newAddedEdges)
}

export default setOntologyAddEdge
