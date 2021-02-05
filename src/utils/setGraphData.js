import { ALGO_TYPE_FULL } from '../constants/algorithms'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import getAllTriplesPerNode from './getAllTriplesPerNode'
import store from '../store'

/**
 * Set graph full data
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @return { undefined }
 */
const setGraphData = async ({
  setStoreState,
}) => {
  const {
    graphVersions,
    selectedGraphVersion
  } = store.getState()

  const {
    classesFromApi,
    objectPropertiesFromApi,
    deletedNodes,
    addedNodes,
    updatedNodes,
    deletedEdges,
    addedEdges,
    updatedEdges,
    addedConnections,
    deletedConnections
  } = graphVersions[selectedGraphVersion]

  setStoreState('classesFromApi', classesFromApi)
  setStoreState('objectPropertiesFromApi', objectPropertiesFromApi)
  setStoreState('deletedNodes', deletedNodes)
  setStoreState('addedNodes', addedNodes)
  setStoreState('updatedNodes', updatedNodes)
  setStoreState('deletedEdges', deletedEdges)
  setStoreState('addedEdges', addedEdges)
  setStoreState('updatedEdges', updatedEdges)
  setStoreState('addedConnections', addedConnections)
  setStoreState('deletedConnections', deletedConnections)

  const classesIds = Object.keys(classesFromApi)
  const predicatesIds = Object.keys(objectPropertiesFromApi)

  // in the background, parse classes to get triples per node
  await getAllTriplesPerNode({
    classesIds,
    predicatesIds,
    setStoreState,
    classesFromApi
  })

  // show full view when
  setNodesIdsToDisplay({
    type: ALGO_TYPE_FULL,
    classesFromApi,
    objectPropertiesFromApi,
    setStoreState
  })
}

export default setGraphData
