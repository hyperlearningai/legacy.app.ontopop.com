/**
 * Check if edge is displayable
 * @param  {Object}   params
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {String}   params.predicate               Predicate id
 * @param  {String}   params.from                    Subject node ID
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {String}   params.to                      Object node ID
 * @return {Boolean}  output                         edge displaybility flag
 */
const showEdgeCheck = ({
  predicate,
  edgesIdsToDisplay,
  from,
  nodesIdsToDisplay,
  to,
}) => {
  if (
    !nodesIdsToDisplay.includes(to.toString())
    || !nodesIdsToDisplay.includes(from.toString())
  ) return false

  if (!edgesIdsToDisplay.includes(predicate.toString())) return false

  return true
}

export default showEdgeCheck
