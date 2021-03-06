import { DELETE_NODE } from '../../constants/api'
import {
  NOTIFY_SUCCESS,
  NOTIFY_WARNING
} from '../../constants/notifications'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import setElementsStyle from '../networkStyling/setElementsStyle'
import countEdges from '../nodesEdgesUtils/countEdges'
import countNodes from '../nodesEdgesUtils/countNodes'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import removeNode from '../nodesEdgesUtils/removeNode'
import showNotification from '../notifications/showNotification'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.addNumber                  addNumber action
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyDeleteNode = async ({
  addNumber,
  selectedElement,
  setStoreState,
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
        addNumber,
        withAuth: true,
        route: DELETE_NODE.replace('{id}', nodeId),
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
          const {
            from,
            to
          } = objectPropertiesFromApi[connection]

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

          // remove edge from graph
          removeEdge(connection)

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

      removeNode(nodeId)
    }
  }

  if (nodesDeleted.length > 0) {
    const message = `${t('nodesDeleted')}: ${nodesDeleted.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('totalEdgesPerNode', newEdgesPerNode)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('deletedEdges', newDeletedEdges)
  setStoreState('classesFromApi', newClassesFromApi)
  setElementsStyle()

  if (nodesDeleted.length > 0) {
    const message = `${t('nodesDeleted')}: ${nodesDeleted.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })

    setStoreState('availableNodesCount', countNodes())
    setStoreState('availableEdgesCount', countEdges())
  }
}

export default setOntologyDeleteNode
