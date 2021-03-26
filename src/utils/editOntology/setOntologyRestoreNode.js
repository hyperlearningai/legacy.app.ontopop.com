import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import httpCall from '../apiCalls/httpCall'
import { API_ENDPOINT_GRAPH_NODES_CREATE } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import getElementLabel from '../networkStyling/getElementLabel'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import {
  OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_DELETE, OPERATION_TYPE_PUSH_UNIQUE, OPERATION_TYPE_UPDATE
} from '../../constants/store'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue                  updateStoreValue action
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyRestoreNode = async ({
  updateStoreValue,
  selectedElement,
  t
}) => {
  const {
    classesFromApiBackup,
    objectPropertiesFromApiBackup,
    totalEdgesPerNodeBackup,
  } = store.getState()

  const restoredNodes = {}

  if (selectedElement.length === 0) return false
  // first add nodes back
  for (let index = 0; index < selectedElement.length; index++) {
    const oldId = selectedElement[index]

    const node = classesFromApiBackup[oldId] ? JSON.parse(JSON.stringify(classesFromApiBackup[oldId])) : undefined

    if (!node) return false

    node.label = 'class'

    const response = await httpCall({
      updateStoreValue,
      withAuth: true,
      route: API_ENDPOINT_GRAPH_NODES_CREATE,
      method: 'post',
      body: node,
      t
    })

    const {
      error, data
    } = response

    const message = `${t('couldNotRestoreNode')}: ${oldId}`
    if (error) {
      showNotification({
        message,
        type: NOTIFY_WARNING
      })
      continue
    }

    if (!data || Object.keys(data).length !== 1) {
      showNotification({
        message,
        type: NOTIFY_WARNING
      })
      continue
    }

    const { id } = data[Object.keys(data)[0]]

    node.id = id

    // remove from backup and delete node and and add new id
    updateStoreValue(['deletedNodes'], OPERATION_TYPE_ARRAY_DELETE, oldId)
    updateStoreValue(['addedNodes'], OPERATION_TYPE_PUSH_UNIQUE, id)
    updateStoreValue(['classesFromApiBackup', oldId], OPERATION_TYPE_DELETE)
    updateStoreValue(['classesFromApi', id], OPERATION_TYPE_UPDATE, node)
    updateStoreValue(['classesFromApiBackup', id], OPERATION_TYPE_UPDATE, node)

    const label = getElementLabel({
      type: 'node',
      id
    })

    const restoreMessage = `${t('nodeRestored')}: ${label}`
    showNotification({
      message: restoreMessage,
      type: NOTIFY_SUCCESS
    })

    // add connections
    updateStoreValue(['totalEdgesPerNode', id], OPERATION_TYPE_UPDATE, [])
    updateStoreValue(['totalEdgesPerNodeBackup', id], OPERATION_TYPE_UPDATE, [])

    // add to restored nodes
    restoredNodes[oldId] = id

    const isVisible = checkNodeVisibility({
      nodeId: id,
    })

    if (isVisible) {
      addNode({
        node,
        updateStoreValue
      })

      // add connection back
      updateStoreValue(['nodesEdges', id], OPERATION_TYPE_UPDATE, [])
    }
  }

  const restoredNodesIds = Object.keys(restoredNodes)

  if (restoredNodesIds.length > 0) {
    restoredNodesIds.forEach((restoredNodeOldId) => {
      const edges = totalEdgesPerNodeBackup[restoredNodeOldId]

      if (edges.length === 0) return false

      edges.forEach((edgeId) => {
        const edge = objectPropertiesFromApiBackup[edgeId]

        const {
          from,
          to,
          userDefined
        } = edge

        if (restoredNodeOldId[from]) {
          edge.from = restoredNodeOldId[from]
        }

        if (restoredNodeOldId[to]) {
          edge.to = restoredNodeOldId[to]
        }

        // add object properties
        updateStoreValue(['objectPropertiesFromApi', edgeId], OPERATION_TYPE_UPDATE, edge)
        updateStoreValue(['objectPropertiesFromApiBackup', edgeId], OPERATION_TYPE_UPDATE, edge)

        // add to connections
        updateStoreValue(['totalEdgesPerNode', edge.from], OPERATION_TYPE_PUSH_UNIQUE, edgeId)
        updateStoreValue(['totalEdgesPerNodeBackup', edge.to], OPERATION_TYPE_PUSH_UNIQUE, edgeId)

        // check if visible
        const isFromVisible = getNode(edge.from) !== null
        const isToVisible = getNode(edge.to) !== null

        if (isFromVisible && isToVisible) {
          // add to nodes edges
          updateStoreValue(['nodesEdges', edge.from], OPERATION_TYPE_PUSH_UNIQUE, edgeId)
          updateStoreValue(['nodesEdges', edge.to], OPERATION_TYPE_PUSH_UNIQUE, edgeId)

          if (userDefined) {
            updateStoreValue(['deletedEdges'], OPERATION_TYPE_ARRAY_DELETE, edgeId)
            updateStoreValue(['addedEdges'], OPERATION_TYPE_PUSH_UNIQUE, edgeId)
          }

          const isVisible = checkEdgeVisibility({
            edgeId: edge.id,
          })

          if (isVisible) {
            addEdge({
              edge,
              updateStoreValue
            })
          }
        }
      })
    })
  }
}

export default setOntologyRestoreNode
