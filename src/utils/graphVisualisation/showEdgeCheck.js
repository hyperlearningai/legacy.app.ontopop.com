/**
 * Check if edge is displayable
 * @param  {Object}   params
 * @param  {Object}   params.edge                    Edge object
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @return {Boolean}  output                         edge displaybility flag
 */
const showEdgeCheck = ({
  edge,
  nodesIdsToDisplay,
}) => {
  const {
    from,
    to,
  } = edge

  if (
    !nodesIdsToDisplay.includes(to.toString())
    || !nodesIdsToDisplay.includes(from.toString())
  ) return false

  return true
}

export default showEdgeCheck
