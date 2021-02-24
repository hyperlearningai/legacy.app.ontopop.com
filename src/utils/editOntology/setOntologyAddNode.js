import store from '../../store'
import {
  UNIQUE_PROPERTY, USER_DEFINED_PROPERTY,
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
    classesFromApiBackup,
    addedNodes,
    stylingNodeCaptionProperty,
    triplesPerNode,
    triplesPerNodeBackup,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newTriplesPerNodeBackup = JSON.parse(JSON.stringify(triplesPerNodeBackup))

  const newNodeId = selectedElementProperties[UNIQUE_PROPERTY]

  if (getNode(newNodeId) !== null) {
    const message = `${t('nodeIdAlreadyExists')}: ${newNodeId}`

    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  newClassesFromApi[newNodeId] = {
    [USER_DEFINED_PROPERTY]: true
  }
  newClassesFromApiBackup[newNodeId] = {
    [USER_DEFINED_PROPERTY]: true
  }

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    // add new node connection as empty array
    if (propertyKey === UNIQUE_PROPERTY) {
      const id = selectedElementProperties[propertyKey]
      newNodesConnections[id] = []
      newTriplesPerNode[id] = []
      newTriplesPerNodeBackup[id] = []
    }

    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      newClassesFromApi[newNodeId][propertyKey] = selectedElementProperties[propertyKey]
      newClassesFromApiBackup[newNodeId][propertyKey] = selectedElementProperties[propertyKey]

      if (propertyKey === stylingNodeCaptionProperty) {
        newClassesFromApi[newNodeId].label = selectedElementProperties[propertyKey]
        newClassesFromApiBackup[newNodeId].label = selectedElementProperties[propertyKey]
      }
    }

    return true
  })

  addNode({
    ...newClassesFromApi[newNodeId],
    id: newNodeId,
    label: newClassesFromApi[newNodeId][stylingNodeCaptionProperty]
  })

  const newAddedNodes = [
    ...addedNodes,
    ...[newNodeId]
  ]

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('triplesPerNodeBackup', newTriplesPerNodeBackup)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('classesFromApiBackup', newClassesFromApiBackup)
  setStoreState('addedNodes', newAddedNodes)
  setNodeStyle({
    nodeId: newNodeId,
  })
}

export default setOntologyAddNode
