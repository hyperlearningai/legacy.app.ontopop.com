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
    deletedConnections,
    nodesConnections,
    triplesPerNode,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newDeletedNodes = deletedNodes.slice()
  const newDeletedConnections = deletedConnections.slice()

  if (selectedElement.length > 0) {
    // on each selected node, first remove connection then remove node
    selectedElement.map((nodeId) => {
      // add to deleted nodes
      if (!newDeletedNodes.includes(nodeId)) {
        newDeletedNodes.push(nodeId)
      }

      // remove connection with node
      if (newNodesConnections[nodeId]) {
        const connections = newNodesConnections[nodeId]

        connections.map((connection) => {
          const {
            from,
            to
          } = getEdge(connection)

          const isFrom = from === nodeId
          const nodeIdToCheck = isFrom ? to : from

          if (newNodesConnections[nodeIdToCheck]) {
            const connectionIndex = newNodesConnections[nodeIdToCheck].indexOf(connection)

            const updatedConnections = newNodesConnections[nodeIdToCheck].splice(connectionIndex, 1)

            newNodesConnections[nodeIdToCheck] = updatedConnections
          }

          if (newTriplesPerNode[nodeIdToCheck]) {
            const connectionIndex = newTriplesPerNode[nodeIdToCheck].indexOf(connection)

            const updatedConnections = newTriplesPerNode[nodeIdToCheck].splice(connectionIndex, 1)

            newTriplesPerNode[nodeIdToCheck] = updatedConnections
          }

          // remove edge from graph
          removeEdge(connection)

          // add to deleted connections
          if (!newDeletedConnections.includes(connection)) {
            newDeletedConnections.push(connection)
          }

          return true
        })

        delete newNodesConnections[nodeId]
      }

      if (newTriplesPerNode[nodeId]) {
        delete newTriplesPerNode[nodeId]
      }

      delete newClassesFromApi[nodeId]

      removeNode(nodeId)

      return true
    })
  }

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('deletedConnections', newDeletedConnections)
  setStoreState('classesFromApi', newClassesFromApi)
  setElementsStyle()
}

export default setOntologyDeleteNode
