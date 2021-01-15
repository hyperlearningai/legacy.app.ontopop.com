const showEdgeCheck = ({
  addedEdges,
  edgeUniqueId,
  edgeId,
  from,
  to,
  edgesIdsToDisplay,
  nodesIdsToDisplay
}) => {
  if (
    !nodesIdsToDisplay.includes(to)
    || !nodesIdsToDisplay.includes(from)
  ) return false

  if (!edgesIdsToDisplay.includes(edgeId)) return false

  return !addedEdges.includes(edgeUniqueId)
}

export default showEdgeCheck
