import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD
} from '../constants/algorithms'
import getNeighbourNodes from './getNeighbourNodes'
import getAllTriplesPerNode from './getAllTriplesPerNode'

const setNodesIdsToDisplay = async ({
  type,
  classesFromApi,
  setStoreState,
  options
}) => {
  if (type === ALGO_TYPE_FULL) {
    const classesIds = Object.keys(classesFromApi)
    await getAllTriplesPerNode({
      classesIds,
      setStoreState,
      classesFromApi
    })

    setStoreState('nodesIdsToDisplay', classesIds)
    // in the background, parse classes to get triples per node
  }

  if (type === ALGO_TYPE_NEIGHBOURHOOD) {
    if (!options) return false

    const {
      selectedNodeId,
      separationDegree,
      triplesPerNode
    } = options

    const neighbourNodes = getNeighbourNodes({
      selectedNodeId,
      separationDegree,
      classesFromApi,
      triplesPerNode
    })

    setStoreState('nodesIdsToDisplay', neighbourNodes)
  }

  return true
}

export default setNodesIdsToDisplay
