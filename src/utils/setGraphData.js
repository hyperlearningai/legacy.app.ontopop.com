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
    classesFromApi,
    objectPropertiesFromApi
  } = store.getState()

  const classesIds = Object.keys(classesFromApi)
  const predicatesIds = Object.keys(objectPropertiesFromApi)

  // in the background, parse classes to get triples per node
  await getAllTriplesPerNode({
    classesIds,
    predicatesIds,
    setStoreState,
    classesFromApi
  })

  // show full view when starting
  setNodesIdsToDisplay({
    type: ALGO_TYPE_FULL,
    setStoreState
  })
}

export default setGraphData
