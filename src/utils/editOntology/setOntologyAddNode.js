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
    nodesEdges,
    classesFromApi,
    classesFromApiBackup,
    addedNodes,
    stylingNodeCaptionProperty,
    edgesPerNode,
    edgesPerNodeBackup,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(edgesPerNodeBackup))

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
      newNodesEdges[id] = []
      newEdgesPerNode[id] = []
      newEdgesPerNodeBackup[id] = []
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

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('edgesPerNodeBackup', newEdgesPerNodeBackup)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('classesFromApiBackup', newClassesFromApiBackup)
  setStoreState('addedNodes', newAddedNodes)
  setNodeStyle({
    nodeId: newNodeId,
  })
}

export default setOntologyAddNode
