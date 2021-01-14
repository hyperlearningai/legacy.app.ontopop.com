/* eslint no-param-reassign:0 */
import getEdge from './getEdge'
import showEdgeCheck from './showEdgeCheck'
import addConnections from './addConnections'
import addNode from './addNode'

const serialiseNodesEdges = ({
  availableNodes,
  availableEdges,
  classesFromApi,
  edgesIdsToDisplay,
  highlightedNodes,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  setStoreState,
  triplesPerNode,
}) => {
  // reset nodes/edges (display at the end of the function)
  availableNodes.clear()
  availableEdges.clear()

  const addedNodes = []
  const addedEdges = []
  const availableNodesList = []
  const availableEdgesList = []
  const availableNodesNormalised = {}
  const nodesConnections = {}
  const edgesConnections = {}

  for (let i = 0; i < nodesIdsToDisplay.length; i++) {
    const nodeId = nodesIdsToDisplay[i]
    const nodeIdObject = classesFromApi[nodeId]
    const triples = triplesPerNode[nodeId]
    nodeIdObject.id = nodeId
    nodeIdObject.label = nodeIdObject.rdfsLabel
      ? nodeIdObject.rdfsLabel.replace(/ /g, '\n') : ''

    addNode({
      availableNodesNormalised,
      availableNodesList,
      addedNodes,
      nodeId,
      nodeIdObject,
      highlightedNodes
    })

    if (triples && triples.length > 0) {
      triples.map((triple) => {
        const {
          from,
          predicate,
          to
        } = triple

        const {
          edgeUniqueId,
          edgeConnection,
          edge,
          fromObject,
          toObject
        } = getEdge({
          from,
          predicate,
          to,
          objectPropertiesFromApi,
          classesFromApi
        })

        const isEdgeDisplayable = showEdgeCheck({
          addedEdges,
          edgeUniqueId,
          edgeId: edge.edgeId,
          from,
          to,
          edgesIdsToDisplay,
          nodesIdsToDisplay
        })

        if (isEdgeDisplayable) {
          addConnections({
            addedEdges,
            edgeUniqueId,
            edge,
            availableEdgesList,
            edgesConnections,
            edgeConnection,
            predicate,
            from,
            to,
            nodesConnections,
            nodesIdsToDisplay,
            edgesIdsToDisplay
          })

          addNode({
            availableNodesNormalised,
            availableNodesList,
            addedNodes,
            nodeId: to,
            nodeIdObject: toObject,
            highlightedNodes
          })

          addNode({
            availableNodesNormalised,
            availableNodesList,
            addedNodes,
            nodeId: from,
            nodeIdObject: fromObject,
            highlightedNodes
          })
        }

        return true
      })
    }
  }

  setStoreState('availableNodesNormalised', availableNodesNormalised)
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))
  setStoreState('edgesConnections', JSON.parse(JSON.stringify(edgesConnections)))

  availableNodes.add(availableNodesList)
  availableEdges.add(availableEdgesList)
  network.redraw()
}

export default serialiseNodesEdges
