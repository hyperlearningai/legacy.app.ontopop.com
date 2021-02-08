/* eslint no-param-reassign:0 */
import getEdge from './getEdge'
import showEdgeCheck from './showEdgeCheck'
import addConnections from './addConnections'
import addNode from './addNode'
import store from '../../store'
import getNodesEdgesFromPaths from '../getNodesEdgesFromPaths'
import getPhysicsOptions from '../getPhysicsOptions'
import highlightSpiderableNodes from '../highlightSpiderableNodes'
/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Object}   params.availableNodes          VisJs Dataset of nodes IDs
 * @param  {Object}   params.availableEdges          VisJs Dataset of edges IDs
 * @param  {Object}   params.classesFromApi          Nodes from initial OwlClasses
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {Array}    params.highlightedNodes        Array of nodes IDs to highlight
 * @param  {Boolean}  params.isNodeOverlay           Flag to make non-highlighted nodes transparent
 * @param  {Object}   params.network                 VisJs network object
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {Object}   params.objectPropertiesFromApi Edges from initial OwlObjectProperties
 * @param  {Function} params.setStoreState           setStoreState action
 * @param  {Object}   params.triplesPerNode          List of triples per node
 * @return { undefined }
 */
const serialiseNodesEdges = ({
  setStoreState,
}) => {
  const {
    availableNodes,
    availableEdges,
    classesFromApi,
    edgesIdsToDisplay,
    highlightedNodes,
    isNodeOverlay,
    network,
    nodesIdsToDisplay,
    objectPropertiesFromApi,
    shortestPathResults,
    triplesPerNode,
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  } = store.getState()

  // reset nodes/edges (display at the end of the function)
  availableNodes.clear()
  availableEdges.clear()

  const addedNodes = []
  const addedEdges = []
  const nodesConnections = {}
  const edgesConnections = {}

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  const {
    // shortestPathEdges,
    shortestPathNodes
  } = getNodesEdgesFromPaths({
    shortestPathResults
  })

  for (let i = 0; i < nodesIdsToDisplay.length; i++) {
    const nodeId = nodesIdsToDisplay[i]
    const nodeIdObject = classesFromApi[nodeId]
    const triples = triplesPerNode[nodeId]
    nodeIdObject.id = nodeId
    nodeIdObject.label = nodeIdObject.rdfsLabel
      ? nodeIdObject.rdfsLabel.replace(/ /g, '\n') : ''

    addNode({
      availableNodes,
      addedNodes,
      isNodeOverlay,
      nodeId,
      nodeIdObject,
      highlightedNodes,
      shortestPathNodes,
    })

    if (triples && triples.length > 0) {
      triples.map((triple) => {
        const {
          from,
          predicate,
          to
        } = triple

        if (!objectPropertiesFromApi[predicate]) return false

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
          classesFromApi,
          isNodeOverlay,
          shortestPathResults
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
            edgesIdsToDisplay,
          })

          addNode({
            availableNodes,
            addedNodes,
            highlightedNodes,
            isNodeOverlay,
            nodeId: to,
            nodeIdObject: toObject,
            shortestPathNodes,
          })

          addNode({
            availableNodes,
            addedNodes,
            highlightedNodes,
            isNodeOverlay,
            nodeId: from,
            nodeIdObject: fromObject,
            shortestPathNodes,
          })
        }

        return true
      })
    }
  }

  setStoreState('availableNodesCount', availableNodes.length)
  setStoreState('availableEdgesCount', availableEdges.length)
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))
  setStoreState('edgesConnections', JSON.parse(JSON.stringify(edgesConnections)))

  network?.redraw()
  network?.setOptions(getPhysicsOptions({
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  }))

  // check if all connection edges are present, otherwise make a different border to display that it's spidetable
  highlightSpiderableNodes({
    nodesConnections,
    triplesPerNode,
    availableNodes,
  })

  return true
}

export default serialiseNodesEdges
