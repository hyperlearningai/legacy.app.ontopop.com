import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'

/**
 * Update neighbourNodes and neighbourEdges recursively
 * @param  {Object}   params
 * @param  {Object}   params.triplesPerNode   List of triples per node
 * @param  {Object}   params.deletedNodes     List of deleted nodes IDs
 * @param  {Object}   params.nextIds          Array of node IDs to loop through
 * @param  {Array}    params.neighbourNodes   Array of neighbour nodes IDs
 * @param  {Number}   params.separationDegree Neighbourhood separation degree as integer
 * @param  {Number}   params.round            Current loop round as integer
 * @return { undefined }
\ */
const loopThroughNodes = ({
  nextIds,
  neighbourNodes,
  triplesPerNode,
  separationDegree,
  deletedNodes,
  round
}) => {
  const nextIdsLoop = []

  nextIds.map((nodeId) => {
    const listOfTriples = triplesPerNode[nodeId]

    if (listOfTriples && listOfTriples.length > 0) {
      listOfTriples.map((triple) => {
        const {
          from,
          to
        } = getEdge(triple)

        const newNode = from === nodeId ? to : from

        if (!neighbourNodes.includes(newNode)
        && !deletedNodes.includes(newNode)) {
          neighbourNodes.push(newNode)

          if (!nextIdsLoop.includes(newNode)) {
            nextIdsLoop.push(newNode)
          }
        }

        return true
      })
    }

    return true
  })

  const nextRound = round + 1

  if (nextIdsLoop.length > 0 && nextRound < separationDegree) {
    loopThroughNodes({
      neighbourNodes,
      nextIds: nextIdsLoop,
      triplesPerNode,
      separationDegree,
      deletedNodes,
      round: nextRound
    })
  }
}

/**
 * Get neighbour nodes and related edges
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree Neighbourhood separation degree as integer
 * @param  {String}   params.selectedNodeId   Selected node ID
 * @return {Array}    neighbourNodes          Array of neighbour nodes IDs
 */
const getNeighbours = ({
  selectedNodeId,
  separationDegree,
}) => {
  const {
    triplesPerNode,
    deletedNodes
  } = store.getState()

  const neighbourNodes = [selectedNodeId]
  const nextIds = [selectedNodeId]
  const round = 0

  if (!selectedNodeId || !triplesPerNode || !separationDegree || separationDegree < 1) {
    return neighbourNodes
  }

  loopThroughNodes({
    nextIds,
    neighbourNodes,
    triplesPerNode,
    separationDegree,
    deletedNodes,
    round
  })

  return neighbourNodes
}

export default getNeighbours
