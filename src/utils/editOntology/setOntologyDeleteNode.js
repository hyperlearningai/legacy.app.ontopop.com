import store from '../../store'
import setElementsStyle from '../networkStyling/setElementsStyle'
import getEdge from '../nodesEdgesUtils/getEdge'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import removeNode from '../nodesEdgesUtils/removeNode'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyDeleteNode = ({
  selectedElement,
  setStoreState,
}) => {
  const {
    classesFromApi,
    deletedNodes,
    deletedEdges,
    nodesEdges,
    edgesPerNode,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))
  const newDeletedNodes = deletedNodes.slice()
  const newDeletedEdges = deletedEdges.slice()

  if (selectedElement.length > 0) {
    // on each selected node, first remove connection then remove node
    selectedElement.map((nodeId) => {
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
          } = getEdge(connection)

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

      return true
    })
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('deletedEdges', newDeletedEdges)
  setStoreState('classesFromApi', newClassesFromApi)
  setElementsStyle()
}

export default setOntologyDeleteNode
