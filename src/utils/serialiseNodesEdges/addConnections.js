/* eslint no-param-reassign:0 */

/**
 * Update edge and node-related arrays/objects with connections
 * @param  {Object}   params
 * @param  {Array}    params.addedEdges               Array of edges IDs being added
 * @param  {Array}    params.availableEdgesList       Array of available edges
 * @param  {Object}   params.availableEdgesNormalised Normalised list of available edges
 * @param  {String}   params.edgeUniqueId             Unique edge id (predicate___from___to)
 * @param  {Object}   params.edge                     Edge object
 * @param  {Object}   params.edgesConnections         NOrmalised List of connections per edge
 * @param  {Array}    params.edgeConnection           Array of connections per edge
 * @param  {Object}   params.nodesConnections         NOrmalised List of connections per node
 * @param  {String}   params.from                     Subject node ID
 * @param  {String}   params.predicate                Predicate node ID
 * @param  {String}   params.to                       Object node ID
 * @return
 */
const addConnections = ({
  addedEdges,
  availableEdgesList,
  availableEdgesNormalised,
  edgeUniqueId,
  edge,
  edgesConnections,
  edgeConnection,
  from,
  nodesConnections,
  predicate,
  to,
}) => {
  addedEdges.push(edgeUniqueId)
  availableEdgesList.push(edge)
  availableEdgesNormalised[edgeUniqueId] = edge  // eslint-disable-line

  if (edgesConnections[predicate] && !edgesConnections[predicate].includes(edge)) {
    edgesConnections[predicate].push(edgeConnection)
  } else {
    edgesConnections[predicate] = [edgeConnection]
  }

  if (nodesConnections[from] && !nodesConnections[from].includes(edge)) {
    nodesConnections[from].push(edge)
  } else {
    nodesConnections[from] = [edge]
  }

  if (nodesConnections[to] && !nodesConnections[to].includes(edge)) {
    nodesConnections[to].push(edge)
  } else {
    nodesConnections[to] = [edge]
  }
}

export default addConnections
