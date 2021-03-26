import { API_ENDPOINT_GRAPH_NODES_ID } from '../../constants/api'
import {
  NOTIFY_SUCCESS,
  NOTIFY_WARNING
} from '../../constants/notifications'
import {
  OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_DELETE, OPERATION_TYPE_PUSH_UNIQUE
} from '../../constants/store'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import checkNodeSpiderability from '../networkStyling/checkNodeSpiderability'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import removeNode from '../nodesEdgesUtils/removeNode'
import showNotification from '../notifications/showNotification'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue           updateStoreValue action
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyDeleteNode = async ({
  updateStoreValue,
  selectedElement,
  t
}) => {
  const {
    totalEdgesPerNode,
    objectPropertiesFromApi
  } = store.getState()

  if (selectedElement.length > 0) {
    // on each selected node, first remove connection then remove node
    for (let index = 0; index < selectedElement.length; index++) {
      const nodeId = selectedElement[index]

      const response = await httpCall({
        updateStoreValue,
        withAuth: true,
        route: API_ENDPOINT_GRAPH_NODES_ID.replace('{id}', nodeId),
        method: 'delete',
        body: {},
        t
      })

      const {
        error, data
      } = response

      const message = t('couldNotDeleteNode')

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

      // remove connections with node
      const edgeIds = totalEdgesPerNode[nodeId]
      const nodesToRestyle = []

      if (edgeIds) {
        edgeIds.forEach((edgeId) => {
          const edge = objectPropertiesFromApi[edgeId]
          const {
            from,
            to
          } = edge

          const nodeIdToCheck = from === nodeId ? to : from
          updateStoreValue(['totalEdgesPerNode', nodeIdToCheck], OPERATION_TYPE_ARRAY_DELETE, edgeId)
          updateStoreValue(['totalEdgesPerNode', nodeIdToCheck], OPERATION_TYPE_ARRAY_DELETE, edgeId)
          updateStoreValue(['nodesEdges', nodeIdToCheck], OPERATION_TYPE_ARRAY_DELETE, edgeId)
          updateStoreValue(['objectPropertiesFromApi', edgeId], OPERATION_TYPE_DELETE)

          if (!nodesToRestyle.includes(nodeIdToCheck)) {
            nodesToRestyle.push(nodeIdToCheck)
          }

          removeEdge({
            edge,
            updateStoreValue
          })
        })
      }

      if (nodesToRestyle.length > 0 && index === selectedElement.length - 1) {
        const visibleEdges = getEdgeIds()

        nodesToRestyle.forEach((nodeToRestyleId) => checkNodeSpiderability({
          nodeId: nodeToRestyleId,
          updateStoreValue,
          visibleEdges
        }))
      }

      // add to deleted nodes
      updateStoreValue(['deletedNodes'], OPERATION_TYPE_PUSH_UNIQUE, nodeId)
      updateStoreValue(['totalEdgesPerNode', nodeId], OPERATION_TYPE_DELETE)
      updateStoreValue(['nodesEdges', nodeId], OPERATION_TYPE_DELETE)
      updateStoreValue(['classesFromApi', nodeId], OPERATION_TYPE_DELETE)

      removeNode({
        nodeId,
        updateStoreValue,
      })

      const deleteMessage = `${t('nodeDeleted')}: ${nodeId}`
      showNotification({
        message: deleteMessage,
        type: NOTIFY_SUCCESS
      })
    }
  }
}

export default setOntologyDeleteNode
