import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD
} from '../constants/algorithms'
import getNeighbours from './getNeighbours'

/**
 * Updates nodes and edges to display
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Object}   params.classesFromApi            Nodes from initial OwlClasses
 * @param  {Object}   params.objectPropertiesFromApi   Edges from initial OwlObjectProperties
 * @param  {String}   params.type                      type of algorithm to use
 * @param  {Object}   params.options                   additional options
 * @return
 */
const setNodesIdsToDisplay = async ({
  type,
  classesFromApi,
  objectPropertiesFromApi,
  setStoreState,
  options
}) => {
  setStoreState('highlightedNodes', [])

  if (type === ALGO_TYPE_FULL) {
    const classesIds = Object.keys(classesFromApi)
    const predicatesIds = Object.keys(objectPropertiesFromApi)

    setStoreState('edgesIdsToDisplay', predicatesIds)
    setStoreState('nodesIdsToDisplay', classesIds)
  }

  if (type === ALGO_TYPE_NEIGHBOURHOOD) {
    if (!options) return false

    const {
      selectedNodeId,
      separationDegree,
      triplesPerNode
    } = options

    const {
      neighbourNodes,
      neighbourEdges
    } = getNeighbours({
      selectedNodeId,
      separationDegree,
      classesFromApi,
      triplesPerNode
    })

    setStoreState('highlightedNodes', [selectedNodeId])
    setStoreState('edgesIdsToDisplay', neighbourEdges)
    setStoreState('nodesIdsToDisplay', neighbourNodes)
  }

  return true
}

export default setNodesIdsToDisplay
