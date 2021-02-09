import store from '../../store'
import {
  UNIQUE_PROPERTY,
  LOW_LEVEL_PROPERTIES,
  LABEL_PROPERTY,
  OWL_ANNOTATION_PROPERTIES
} from '../../constants/graph'
import showNotification from '../showNotification'
import { NOTIFY_WARNING } from '../../constants/notifications'

/**
 * ADd ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @return {undefined}
 */
const setOntologyAddNode = ({
  setStoreState,
  selectedElementProperties,
  addToObject,
  t
}) => {
  const {
    graphVersions,
    classesFromApi,
    selectedGraphVersion,
    availableNodes,
    addedNodes,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  const newNodeId = selectedElementProperties[UNIQUE_PROPERTY]

  if (availableNodes.get(newNodeId)) {
    const message = `${t('nodeIdAlreadyExists')}: newNodeId`

    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  newClassesFromApi[newNodeId] = {}

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      if (LOW_LEVEL_PROPERTIES.includes(propertyKey)) {
        newClassesFromApi[newNodeId][propertyKey] = selectedElementProperties[propertyKey]
      } else {
        if (!newClassesFromApi[newNodeId][OWL_ANNOTATION_PROPERTIES]) {
          newClassesFromApi[newNodeId][OWL_ANNOTATION_PROPERTIES] = {}
        }

        newClassesFromApi[newNodeId][OWL_ANNOTATION_PROPERTIES][propertyKey] = selectedElementProperties[propertyKey]
      }

      if (propertyKey === LABEL_PROPERTY) {
        newClassesFromApi[newNodeId].label = selectedElementProperties[propertyKey]
        availableNodes.add({
          ...newClassesFromApi[newNodeId],
          id: newNodeId,
          label: selectedElementProperties[propertyKey]
        })
      }
    }

    return true
  })

  const newAddedNodes = [
    ...addedNodes,
    ...[newNodeId]
  ]

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.addedNodes = newAddedNodes

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('addedNodes', newAddedNodes)
}

export default setOntologyAddNode
