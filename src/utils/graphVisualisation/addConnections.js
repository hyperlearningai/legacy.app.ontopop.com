/* eslint no-param-reassign:0 */
import addEdge from '../nodesEdgesUtils/addEdge'

/**
 * Update edge and node-related arrays/objects with connections
 * @param  {Object}   params
 * @param  {Object}   params.edge                     Edge object
 * @param  {Object}   params.nodesConnections         NOrmalised List of connections per node
 * @return { undefined }
 */
const addConnections = ({
  edge,
  nodesConnections,
}) => {
  addEdge(edge)

  const {
    from,
    to,
    predicate
  } = edge

  if (nodesConnections[from]) {
    const index = nodesConnections[from].indexOf(predicate)

    if (index === -1) {
      nodesConnections[from].push(predicate)
    }
  } else {
    nodesConnections[from] = [predicate]
  }

  if (nodesConnections[to]) {
    const index = nodesConnections[to].indexOf(predicate)

    if (index === -1) {
      nodesConnections[to].push(predicate)
    }
  } else {
    nodesConnections[to] = [predicate]
  }
}

export default addConnections
