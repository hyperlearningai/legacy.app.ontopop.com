import { ALGO_TYPE_FULL } from '../constants/algorithms'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import getAllTriplesPerNode from './getAllTriplesPerNode'

/**
 * Set graph full data
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of edge filters {property [string], value [string]}
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToObject               Add to object action
 * @return
 */
const setGraphData = async ({
  setStoreState,
  addToObject,
  classes,
  objectProperties,
  graphName
}) => {
  setStoreState('classesFromApi', classes)
  setStoreState('objectPropertiesFromApi', objectProperties)
  addToObject('graphVersions', graphName, {
    classesFromApi: classes,
    objectPropertiesFromApi: objectProperties,
    classesFromApiBackup: classes,
    objectPropertiesFromApiBackup: objectProperties,
    deletedNodes: [],
    addedNodes: [],
    udpatedNodes: []
  })

  const classesIds = Object.keys(classes)
  const predicatesIds = Object.keys(objectProperties)

  // in the background, parse classes to get triples per node
  await getAllTriplesPerNode({
    classesIds,
    predicatesIds,
    setStoreState,
    classesFromApi: classes
  })

  // show full view when
  setNodesIdsToDisplay({
    type: ALGO_TYPE_FULL,
    classesFromApi: classes,
    objectPropertiesFromApi: objectProperties,
    setStoreState
  })
}

export default setGraphData
