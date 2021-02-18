/**
 * Check if edge is displayable
 * @param  {Object}   params
 * @param  {Object}   params.addedEdges              Array of edges IDs been added
 * @param  {Object}   params.id                      Edge ID
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {String}   params.predicate               Predicate id
 * @param  {String}   params.from                    Subject node ID
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {String}   params.to                      Object node ID
 * @return {Boolean}  output                         edge displaybility flag
 */
const showEdgeCheck = ({
  addedEdges,
  predicate,
  edgesIdsToDisplay,
  id,
  from,
  nodesIdsToDisplay,
  to,
}) => {
  if (
    !nodesIdsToDisplay.includes(to)
    || !nodesIdsToDisplay.includes(from)
  ) return false

  if (!edgesIdsToDisplay.includes(predicate)) return false

  return !addedEdges.includes(id)
}

export default showEdgeCheck
