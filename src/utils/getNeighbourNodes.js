const loopthroughNodes = ({
  nextIds,
  nodesToDisplay,
  triplesPerNode,
  separationDegree,
  round
}) => {
  const nextIdsLoop = []

  nextIds.map((nodeId) => {
    const listOfTriples = triplesPerNode[nodeId]

    if (listOfTriples && listOfTriples.length > 0) {
      listOfTriples.map((triple) => {
        const {
          from,
          // predicate,
          to
        } = triple

        const newNode = from === nodeId ? to : from

        if (!nodesToDisplay.includes(newNode)) {
          nodesToDisplay.push(newNode)

          if (!nextIdsLoop.includes(newNode)) {
            nextIdsLoop.push(newNode)
          }
        }
        return true
      })
    }

    return true
  })

  if (nextIdsLoop.length > 0 && round < separationDegree) {
    loopthroughNodes({
      nodesToDisplay,
      nextIds: nextIdsLoop,
      triplesPerNode,
      separationDegree,
      round: round + 1
    })
  }
}

const getNeighbourNodes = ({
  selectedNodeId,
  separationDegree,
  classesFromApi,
  triplesPerNode
}) => {
  const nodesToDisplay = [selectedNodeId]
  const nextIds = [selectedNodeId]
  const round = 0

  if (!selectedNodeId || !triplesPerNode || !separationDegree || separationDegree < 1) return nodesToDisplay

  loopthroughNodes({
    nextIds,
    nodesToDisplay,
    triplesPerNode,
    classesFromApi,
    separationDegree,
    round
  })

  return nodesToDisplay
}

export default getNeighbourNodes
