/* eslint no-param-reassign:0 */

import addEdge from '../nodesEdgesUtils/addEdge'

/**
 * Update edge and node-related arrays/objects with connections
 * @param  {Object}   params
 * @param  {Array}    params.addedEdges               Array of edges IDs being added
 * @param  {String}   params.id                       Unique edge id (predicate___from___to)
 * @param  {Object}   params.edge                     Edge object
 * @param  {Object}   params.edgesConnections         NOrmalised List of connections per edge
 * @param  {Array}    params.edgeConnection           Array of connections per edge
 * @param  {Object}   params.nodesConnections         NOrmalised List of connections per node
 * @param  {String}   params.from                     Subject node ID
 * @param  {String}   params.predicate                Predicate node ID
 * @param  {String}   params.to                       Object node ID
 * @return { undefined }
 */
const addConnections = ({
  addedEdges,
  id,
  edge,
  edgesConnections,
  edgeConnection,
  from,
  nodesConnections,
  predicate,
  to,
}) => {
  addedEdges.push(id)

  addEdge(edge)

  const edgeConnectionWithPredicate = {
    ...edgeConnection,
    predicate
  }

  if (edgesConnections[predicate] && !edgesConnections[predicate].includes(edge)) {
    edgesConnections[predicate].push(edgeConnection)
  } else {
    edgesConnections[predicate] = [edgeConnection]
  }

  if (nodesConnections[from] && !nodesConnections[from].includes(edge)) {
    nodesConnections[from].push(edgeConnectionWithPredicate)
  } else {
    nodesConnections[from] = [edgeConnectionWithPredicate]
  }

  if (nodesConnections[to] && !nodesConnections[to].includes(edge)) {
    nodesConnections[to].push(edgeConnectionWithPredicate)
  } else {
    nodesConnections[to] = [edgeConnectionWithPredicate]
  }
}

export default addConnections
