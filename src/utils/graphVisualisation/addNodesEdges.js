/* eslint no-param-reassign:0 */
import addEdge from '../nodesEdgesUtils/addEdge'

/**
 * Update edge and node-related arrays/objects with connections
 * @param  {Object}   params
 * @param  {Object}   params.edge                     Edge object
 * @param  {Object}   params.nodesEdges         NOrmalised List of connections per node
 * @return { undefined }
 */
const addNodesEdges = ({
  edge,
  nodesEdges,
}) => {
  addEdge(edge)

  const {
    from,
    to,
    id
  } = edge

  if (nodesEdges[from]) {
    const index = nodesEdges[from].indexOf(id)

    if (index === -1) {
      nodesEdges[from].push(id)
    }
  } else {
    nodesEdges[from] = [id]
  }

  if (nodesEdges[to]) {
    const index = nodesEdges[to].indexOf(id)

    if (index === -1) {
      nodesEdges[to].push(id)
    }
  } else {
    nodesEdges[to] = [id]
  }
}

export default addNodesEdges
