/**
 * Check if edge is displayable
 * @param  {Object}   params
 * @param  {Object}   params.addedEdges              Array of edges IDs been added
 * @param  {Object}   params.edgeId                  Edge ID
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {String}   params.edgeUniqueId            Unique edge id (predicate___from___to)
 * @param  {String}   params.from                    Subject node ID
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {String}   params.to                      Object node ID
 * @return {Boolean}  output                         edge displaybility flag
 */
const showEdgeCheck = ({
  addedEdges,
  edgeId,
  edgesIdsToDisplay,
  edgeUniqueId,
  from,
  nodesIdsToDisplay,
  to,
}) => {
  if (
    !nodesIdsToDisplay.includes(to)
    || !nodesIdsToDisplay.includes(from)
  ) return false

  if (!edgesIdsToDisplay.includes(edgeId)) return false

  return !addedEdges.includes(edgeUniqueId)
}

export default showEdgeCheck
