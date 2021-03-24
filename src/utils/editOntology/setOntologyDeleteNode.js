import { API_ENDPOINT_GRAPH_NODES_ID } from '../../constants/api'
import {
  NOTIFY_SUCCESS,
  NOTIFY_WARNING
} from '../../constants/notifications'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import setElementsStyle from '../networkStyling/setElementsStyle'
import removeNode from '../nodesEdgesUtils/removeNode'
import showNotification from '../notifications/showNotification'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue                  updateStoreValue action
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
    classesFromApi,
    deletedNodes,
    deletedEdges,
    nodesEdges,
    totalEdgesPerNode,
    objectPropertiesFromApi
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(totalEdgesPerNode))
  const newDeletedNodes = deletedNodes.slice()
  const newDeletedEdges = deletedEdges.slice()

  const nodesDeleted = []

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

      nodesDeleted.push(nodeId)

      // add to deleted nodes
      if (!newDeletedNodes.includes(nodeId)) {
        newDeletedNodes.push(nodeId)
      }

      // remove connection with node
      if (newNodesEdges[nodeId]) {
        const connections = newNodesEdges[nodeId]

        connections.map((connection) => {
          const edge = objectPropertiesFromApi[connection]
          const {
            from,
            to
          } = edge

          const isFrom = from === nodeId
          const nodeIdToCheck = isFrom ? to : from

          if (newNodesEdges[nodeIdToCheck]) {
            const connectionIndex = newNodesEdges[nodeIdToCheck].indexOf(connection)

            const updatedConnections = newNodesEdges[nodeIdToCheck].splice(connectionIndex, 1)

            newNodesEdges[nodeIdToCheck] = updatedConnections
          }

          if (newEdgesPerNode[nodeIdToCheck]) {
            const connectionIndex = newEdgesPerNode[nodeIdToCheck].indexOf(connection)

            const updatedConnections = newEdgesPerNode[nodeIdToCheck].splice(connectionIndex, 1)

            newEdgesPerNode[nodeIdToCheck] = updatedConnections
          }

          // add to deleted connections
          if (!newDeletedEdges.includes(connection)) {
            newDeletedEdges.push(connection)
          }

          return true
        })

        delete newNodesEdges[nodeId]
      }

      if (newEdgesPerNode[nodeId]) {
        delete newEdgesPerNode[nodeId]
      }

      delete newClassesFromApi[nodeId]

      removeNode({
        nodeId,
        updateStoreValue,
      })
    }
  }

  if (nodesDeleted.length > 0) {
    const message = `${t('nodesDeleted')}: ${nodesDeleted.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })
  }

  updateStoreValue(['nodesEdges'], OPERATION_TYPE_UPDATE, newNodesEdges)
  updateStoreValue(['totalEdgesPerNode'], OPERATION_TYPE_UPDATE, newEdgesPerNode)
  updateStoreValue(['deletedNodes'], OPERATION_TYPE_UPDATE, newDeletedNodes)
  updateStoreValue(['deletedEdges'], OPERATION_TYPE_UPDATE, newDeletedEdges)
  updateStoreValue(['classesFromApi'], OPERATION_TYPE_UPDATE, newClassesFromApi)
  setElementsStyle()

  if (nodesDeleted.length > 0) {
    const message = `${t('nodesDeleted')}: ${nodesDeleted.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })
  }
}

export default setOntologyDeleteNode
