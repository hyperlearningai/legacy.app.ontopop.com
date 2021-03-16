import store from '../../store'
import getElementLabel from '../networkStyling/getElementLabel'
import getEdge from '../nodesEdgesUtils/getEdge'

/**
 * Loop through neighbours
 * @param  {Object}   params
 * @param  {Array}    params.edgesToExplore            Array of edges IDs
 * @param  {String}   params.endNode                   End node id
 * @param  {Array}    params.exploredNodes             Array of objects containing nodes IDs already explored
 * @param  {Object}   params.nodesEdges                Normalised array of nodes with related in and out connections
 * @param  {Array}    params.pathRoots                 Array of strings with path root at same index of edgesToExplore edge ID
 * @param  {Array}    params.nodesToExclude            Node IDs to exclude
 * @param  {Array}    params.edgesToExclude            Edge labels to exclude
 * @param  {Object}   params.userDefinedEdgeStyling    User-defined edge styling properties
 * @param  {Object}   params.globalEdgeStyling         Global edge styling properties
 * @return {Array}    paths                            Array of strings concatenating triples
 */
const loopThroughNeighbours = ({
  edgesToExplore,
  endNode,
  exploredNodes,
  nodesEdges,
  pathRoots,
  nodesToExclude,
  edgesToExclude,
  userDefinedEdgeStyling,
  globalEdgeStyling,
}) => {
  const paths = []

  if (edgesToExplore.length === 0) return paths

  let isEndNodeFound = false
  const nextEdgesToExplore = []
  const nextPathRoots = []

  for (let index = 0; index < edgesToExplore.length; index++) {
    const edgeId = edgesToExplore[index]

    const nextPathRoot = `${pathRoots[index]}|||${edgeId}`

    const edge = getEdge(edgeId)

    const {
      from,
      to,
    } = edge

    const label = getElementLabel({
      type: 'edge',
      id: edgeId
    })

    if (edgesToExclude.includes(label)) continue
    if (nodesToExclude.includes(from)) continue
    if (nodesToExclude.includes(to)) continue

    if (
      !exploredNodes.includes(from)
      && nodesEdges[from]
    ) {
      nodesEdges[from].map((triple) => {
        if (!nextEdgesToExplore.includes(triple)) {
          nextEdgesToExplore.push(triple)
          nextPathRoots.push(nextPathRoot)
        }
        return true
      })

      exploredNodes.push(from)
    }

    if (
      !exploredNodes.includes(to)
      && nodesEdges[to]
    ) {
      nodesEdges[to].map((triple) => {
        if (!nextEdgesToExplore.includes(triple)) {
          nextEdgesToExplore.push(triple)
          nextPathRoots.push(nextPathRoot)
        }
        return true
      })

      exploredNodes.push(to)
    }

    if ([from, to].includes(endNode)) {
      isEndNodeFound = true
      paths.push(nextPathRoot)
    }
  }

  if (isEndNodeFound) {
    return paths
  }

  return loopThroughNeighbours({
    endNode,
    exploredNodes,
    edgesToExplore: nextEdgesToExplore,
    pathRoots: nextPathRoots,
    nodesEdges,
    nodesToExclude,
    edgesToExclude,
    userDefinedEdgeStyling,
    globalEdgeStyling,
  })
}

/**
 * Get shortest path
 * @param  {Object}   params
 * @param  {Array}    params.shortestPathSelectedNodes  Array of strings with selected nodes IDs
 * @param  {Object}   params.nodesEdges                 Normalised array of nodes with related in and out connections
 * @param  {Array}    params.nodesToExclude             Node IDs to exclude
 * @param  {Array}    params.edgesToExclude             Edge labels to exclude
 * @return {Array}    paths                             Array of strings concatenating triples
 */
const getShortestPath = async ({
  shortestPathSelectedNodes,
  nodesEdges,
  nodesToExclude,
  edgesToExclude
}) => {
  const {
    userDefinedEdgeStyling,
    globalEdgeStyling,
  } = store.getState()

  const [startNode, endNode] = shortestPathSelectedNodes
  const nodeConnections = nodesEdges[startNode]

  if (!nodeConnections || nodeConnections.length === 0) return []

  const exploredNodes = [startNode]
  const edgesToExplore = nodeConnections
  const pathRoots = edgesToExplore.map(() => startNode)

  return loopThroughNeighbours({
    endNode,
    exploredNodes,
    edgesToExplore,
    pathRoots,
    nodesEdges,
    nodesToExclude,
    edgesToExclude,
    userDefinedEdgeStyling,
    globalEdgeStyling,
  })
}

export default getShortestPath
