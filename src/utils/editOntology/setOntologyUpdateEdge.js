import store from '../../store'
import {
  UNIQUE_PROPERTY,
  LOW_LEVEL_PROPERTIES,
  LABEL_PROPERTY,
  OWL_ANNOTATION_PROPERTIES
} from '../../constants/graph'
/**
 * Update ontology edges
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected edge ID
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @return {undefined}
 */
const setOntologyUpdateEdge = ({
  selectedElement,
  setStoreState,
  selectedElementProperties,
  addToObject
}) => {
  const {
    graphVersions,
    objectPropertiesFromApi,
    updatedEdges,
    selectedGraphVersion,
    availableEdges,
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      if (LOW_LEVEL_PROPERTIES.includes(propertyKey)) {
        newObjectPropertiesFromApi[selectedElement][propertyKey] = selectedElementProperties[propertyKey]
      } else {
        if (!newObjectPropertiesFromApi[selectedElement][OWL_ANNOTATION_PROPERTIES]) {
          newObjectPropertiesFromApi[selectedElement][OWL_ANNOTATION_PROPERTIES] = {}
        }

        newObjectPropertiesFromApi[selectedElement][OWL_ANNOTATION_PROPERTIES][propertyKey] = selectedElementProperties[propertyKey]
      }

      if (propertyKey === LABEL_PROPERTY) {
        newObjectPropertiesFromApi[selectedElement].label = selectedElementProperties[propertyKey]

        const items = availableEdges.get({
          filter: (item) => item.id.includes(selectedElement)
        })

        if (items.length > 0) {
          items.map((item) => availableEdges.update({ id: item.id, label: selectedElementProperties[propertyKey] }))
        }
      }
    }

    return true
  })

  const newUpdatedEdges = [
    ...updatedEdges,
    ...[selectedElement]
  ]

  newGraphVersion.objectPropertiesFromApi = newObjectPropertiesFromApi
  newGraphVersion.updatedEdges = newUpdatedEdges
  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)

  setStoreState('updatedEdges', newUpdatedEdges)
}

export default setOntologyUpdateEdge
