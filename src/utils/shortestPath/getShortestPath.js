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
 * @param  {Object}   params.classesFromApi            All available nodes and related properties
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
  classesFromApi,
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

    if (edge === null) continue

    const {
      from,
      to,
    } = edge

    if (nodesToExclude.includes(from)) continue
    if (nodesToExclude.includes(to)) continue

    const label = getElementLabel({
      type: 'edge',
      id: edgeId
    })

    if (edgesToExclude.includes(label)) continue

    if (
      !exploredNodes.includes(from)
      && nodesEdges[from]
    ) {
      nodesEdges[from].forEach((nodeEdgeId) => {
        if (nextEdgesToExplore.includes(nodeEdgeId)) return false

        nextEdgesToExplore.push(nodeEdgeId)
        nextPathRoots.push(nextPathRoot)
      })

      exploredNodes.push(from)
    }

    if (
      !exploredNodes.includes(to)
      && nodesEdges[to]
    ) {
      nodesEdges[to].forEach((nodeEdgeId) => {
        if (nextEdgesToExplore.includes(nodeEdgeId)) return false

        nextEdgesToExplore.push(nodeEdgeId)
        nextPathRoots.push(nextPathRoot)
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
    classesFromApi,
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
  nodesToExclude,
  edgesToExclude,
}) => {
  const {
    userDefinedEdgeStyling,
    globalEdgeStyling,
    classesFromApi,
    nodesEdges
  } = store.getState()

  const [startNode, endNode] = shortestPathSelectedNodes
  const nodeEdges = nodesEdges[startNode]

  if (!nodeEdges || nodeEdges.length === 0) return []

  const exploredNodes = [startNode]
  const edgesToExplore = nodeEdges
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
    classesFromApi
  })
}

export default getShortestPath
