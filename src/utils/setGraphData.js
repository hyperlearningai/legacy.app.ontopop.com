import { ALGO_TYPE_FULL } from '../constants/algorithms'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import getAllTriplesPerNode from './getAllTriplesPerNode'
import store from '../store'

/**
 * Set graph full data
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.graphVersion              Selected graph version
 * @return { undefined }
 */
const setGraphData = async ({
  setStoreState,
  graphVersion
}) => {
  const {
    graphVersions
  } = store.getState()

  const {
    classesFromApi,
    objectPropertiesFromApi
  } = graphVersions[graphVersion]

  setStoreState('classesFromApi', classesFromApi)
  setStoreState('objectPropertiesFromApi', objectPropertiesFromApi)

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
