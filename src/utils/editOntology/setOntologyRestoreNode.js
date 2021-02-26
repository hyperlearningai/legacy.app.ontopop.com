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
    deletedEdges,
    objectPropertiesFromApi,
    stylingNodeCaptionProperty,
    objectPropertiesFromApiBackup,
    nodesEdges,
    edgesPerNode,
    edgesPerNodeBackup
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newDeletedEdges = deletedEdges.slice()
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(edgesPerNodeBackup))

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !selectedElement.includes(nodeId))

  if (selectedElement.length > 0) {
    // first add node back
    selectedElement.map((nodeId) => {
      const nodeObject = newClassesFromApiBackup[nodeId] || {}
      newClassesFromApi[nodeId] = JSON.parse(JSON.stringify(nodeObject))

      nodeObject.id = nodeId
      nodeObject.label = nodeObject[stylingNodeCaptionProperty]

      addNode(nodeObject)

      // add connection back
      newNodesEdges[nodeId] = []
      newEdgesPerNode[nodeId] = []

      return true
    })

    // then add edges
    selectedElement.map((nodeId) => {
      const edges = newEdgesPerNodeBackup[nodeId]

      if (edges.length > 0) {
        edges.map((edgeId) => {
          const {
            from,
            to
          } = newObjectPropertiesFromApiBackup[edgeId]

          if (newDeletedNodes.includes(from) || newDeletedNodes.includes(to)) return false

          const edge = getEdgeObject({
            edge: newObjectPropertiesFromApiBackup[edgeId]
          })

          // add edgeId to triple
          if (!newEdgesPerNode[from].includes(edgeId)) {
            newEdgesPerNode[from].push(edgeId)
          }

          if (!newEdgesPerNode[to].includes(edgeId)) {
            newEdgesPerNode[to].push(edgeId)
          }

          const isFromVisible = getNode(from) !== null
          const isToVisible = getNode(to) !== null

          if (isFromVisible && isToVisible) {
            // add to nodes edges
            if (!newNodesEdges[from].includes(edgeId)) {
              newNodesEdges[from].push(edgeId)
            }

            if (!newNodesEdges[to].includes(edgeId)) {
              newNodesEdges[to].push(edgeId)
            }

            const deletedEdgeIndex = newDeletedEdges.indexOf(edgeId)

            if (deletedEdgeIndex > -1) {
              newDeletedEdges.splice(deletedEdgeIndex, 1)
            }

            addEdge(edge)
          }

          return true
        })
      }

      return true
    })
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('deletedEdges', newDeletedEdges)
  setElementsStyle()
}

export default setOntologyRestoreNode
