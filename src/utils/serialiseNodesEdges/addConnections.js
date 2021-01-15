/* eslint no-param-reassign:0 */
const addConnections = ({
  addedEdges,
  edgeUniqueId,
  edge,
  availableEdgesList,
  availableEdgesNormalised,
  edgesConnections,
  edgeConnection,
  predicate,
  from,
  to,
  nodesConnections
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
