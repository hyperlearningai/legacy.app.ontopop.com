import store from '../../store'
import {
  UNIQUE_PROPERTY,
  LOW_LEVEL_PROPERTIES,
  OWL_ANNOTATION_PROPERTIES
} from '../../constants/graph'
import showNotification from '../notifications/showNotification'
import { NOTIFY_WARNING } from '../../constants/notifications'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import setNodeStyle from '../networkStyling/setNodeStyle'

/**
 * ADd ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyAddNode = ({
  setStoreState,
  selectedElementProperties,
  t
}) => {
  const {
    nodesConnections,
    classesFromApi,
    addedNodes,
    stylingNodeCaptionProperty,
    triplesPerNode
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))

  const newNodeId = selectedElementProperties[UNIQUE_PROPERTY]

  if (getNode(newNodeId) !== null) {
    const message = `${t('nodeIdAlreadyExists')}: ${newNodeId}`

    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  newClassesFromApi[newNodeId] = {}

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    // add new node connection as empty array
    if (propertyKey === UNIQUE_PROPERTY) {
      const id = selectedElementProperties[propertyKey]
      newNodesConnections[id] = []
      newTriplesPerNode[id] = []
    }

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

      if (propertyKey === stylingNodeCaptionProperty) {
        newClassesFromApi[newNodeId].label = selectedElementProperties[propertyKey]
        addNode({
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

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('addedNodes', newAddedNodes)
  setNodeStyle({
    nodeId: newNodeId,
  })
}

export default setOntologyAddNode
