import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import setElementsStyle from '../networkStyling/setElementsStyle'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @return {undefined}
 */
const setOntologyRestoreNode = ({
  selectedElement,
  setStoreState,
}) => {
  const {
    classesFromApiBackup,
    classesFromApi,
    deletedNodes,
    objectPropertiesFromApi,
    stylingNodeCaptionProperty,
    objectPropertiesFromApiBackup,
    nodesConnections,
    triplesPerNode,
    triplesPerNodeBackup
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newTriplesPerNodeBackup = JSON.parse(JSON.stringify(triplesPerNodeBackup))

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !selectedElement.includes(nodeId))

  if (selectedElement.length > 0) {
    // first add node and related connections back
    selectedElement.map((nodeId) => {
      const nodeObject = newClassesFromApiBackup[nodeId] || {}
      newClassesFromApi[nodeId] = JSON.parse(JSON.stringify(nodeObject))

      nodeObject.id = nodeId
      nodeObject.label = nodeObject[stylingNodeCaptionProperty]

      addNode(nodeObject)

      // add connection back
      newNodesConnections[nodeId] = []
      newTriplesPerNode[nodeId] = []

      return true
    })

    // then add connections
    selectedElement.map((nodeId) => {
      const connections = newTriplesPerNodeBackup[nodeId]

      if (connections.length > 0) {
        connections.map((connection) => {
          const {
            sourceNodeId,
            targetNodeId
          } = newObjectPropertiesFromApiBackup[connection]

          const from = sourceNodeId.toString()
          const to = targetNodeId.toString()

          if (newDeletedNodes.includes(from) || newDeletedNodes.includes(to)) return false

          const edge = getEdgeObject({
            edge: newObjectPropertiesFromApiBackup[connection]
          })

          // add connection to triple
          if (!newTriplesPerNode[from].includes(connection)) {
            newTriplesPerNode[from].push(connection)
          }

          if (!newTriplesPerNode[to].includes(connection)) {
            newTriplesPerNode[to].push(connection)
          }

          const fromOnCanvas = getNode(from)
          const toOnCanvas = getNode(to)

          if (fromOnCanvas !== null && toOnCanvas !== null) {
            // add to nodes connections
            if (!newNodesConnections[from].includes(connection)) {
              newNodesConnections[from].push(connection)
            }

            if (!newNodesConnections[to].includes(connection)) {
              newNodesConnections[to].push(connection)
            }

            addEdge(edge)
          }

          return true
        })
      }

      return true
    })
  }

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('deletedNodes', newDeletedNodes)
  setElementsStyle()
}

export default setOntologyRestoreNode
