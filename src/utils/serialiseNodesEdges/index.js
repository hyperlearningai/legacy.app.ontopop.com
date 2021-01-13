/* eslint no-param-reassign:0 */
import getEdge from './getEdge'
import showEdgeCheck from './showEdgeCheck'
import addConnections from './addConnections'
import addNode from './addNode'

const serialiseNodesEdges = async ({
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  classesFromApi,
  objectPropertiesFromApi,
  setStoreState,
  triplesPerNode,
  highlightedNodes
  // edgesToIgnore,
  // deletedNodes,
}) => {
  const addedNodes = []
  const addedEdges = []
  const availableNodes = []
  const availableEdges = []
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
      availableNodes,
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
            availableEdges,
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
            availableNodes,
            addedNodes,
            nodeId: to,
            nodeIdObject: toObject,
            highlightedNodes
          })

          addNode({
            availableNodesNormalised,
            availableNodes,
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
  setStoreState('availableNodes', availableNodes)
  setStoreState('availableEdges', availableEdges)
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))
  setStoreState('edgesConnections', JSON.parse(JSON.stringify(edgesConnections)))
}

export default serialiseNodesEdges
