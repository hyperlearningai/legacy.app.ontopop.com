/* eslint no-param-reassign:0 */
import getEdge from './getEdge'
import showEdgeCheck from './showEdgeCheck'
import addConnections from './addConnections'
import addNode from './addNode'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Object}   params.availableNodes          VisJs Dataset of nodes IDs
 * @param  {Object}   params.availableEdges          VisJs Dataset of edges IDs
 * @param  {Object}   params.classesFromApi          Nodes from initial OwlClasses
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {Array}    params.highlightedNodes        Array of nodes IDs to highlight
 * @param  {Object}   params.network                 VisJs network object
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {Object}   params.objectPropertiesFromApi Edges from initial OwlObjectProperties
 * @param  {Function} params.setStoreState           setStoreState action
 * @param  {Object}   params.triplesPerNode          List of triples per node
 * @return
 */
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
  const availableEdgesNormalised = {}
  const nodesConnections = {}
  const edgesConnections = {}

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

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
            edgesIdsToDisplay,
            availableEdgesNormalised
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
  setStoreState('availableEdgesNormalised', availableEdgesNormalised)
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))
  setStoreState('edgesConnections', JSON.parse(JSON.stringify(edgesConnections)))

  availableNodes.add(availableNodesList)
  availableEdges.add(availableEdgesList)
  network.redraw()
  return true
}

export default serialiseNodesEdges
