const loopthroughNodes = ({
  nextIds,
  neighbourNodes,
  neighbourEdges,
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
          predicate,
          to
        } = triple

        const newNode = from === nodeId ? to : from

        if (!neighbourNodes.includes(newNode)) {
          neighbourNodes.push(newNode)

          if (!nextIdsLoop.includes(newNode)) {
            nextIdsLoop.push(newNode)
          }
        }

        if (!neighbourEdges.includes(predicate)) {
          neighbourEdges.push(predicate)
        }

        return true
      })
    }

    return true
  })

  const nextRound = round + 1

  if (nextIdsLoop.length > 0 && nextRound < separationDegree) {
    loopthroughNodes({
      neighbourNodes,
      nextIds: nextIdsLoop,
      neighbourEdges,
      triplesPerNode,
      separationDegree,
      round: nextRound
    })
  }
}

const getNeighbours = ({
  selectedNodeId,
  separationDegree,
  classesFromApi,
  triplesPerNode
}) => {
  const neighbourNodes = [selectedNodeId]
  const neighbourEdges = []
  const nextIds = [selectedNodeId]
  const round = 0

  if (!selectedNodeId || !triplesPerNode || !separationDegree || separationDegree < 1) return neighbourNodes

  loopthroughNodes({
    nextIds,
    neighbourNodes,
    neighbourEdges,
    triplesPerNode,
    classesFromApi,
    separationDegree,
    round
  })

  return {
    neighbourNodes,
    neighbourEdges
  }
}

export default getNeighbours
