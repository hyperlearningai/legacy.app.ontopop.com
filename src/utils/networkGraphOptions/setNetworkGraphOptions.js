import store from '../../store'
import toggleElements from './toggleElements'

/**
 * Set network graph options
 * @param  {Object}   params
 * @param  {Function} params.addNumber                 addNumber action
 * @param  {Function} params.addToObject               Add to object action
 * @param  {Function} params.toggleFromSubArray        toggleFromSubArray action
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.toggleFromArrayInKey      toggleFromArrayInKey action
 * @param  {Boolean}  params.isUpperOntologyVisible    Show upper ontology flag
 * @param  {Boolean}  params.isSubClassEdgeVisible     Show subclass edges flag
 * @param  {Boolean}  params.isDatasetVisible          Show dataset nodes flag
 * @return { undefined }
 */
const setNetworkGraphOptions = ({
  isUpperOntologyVisible,
  isSubClassEdgeVisible,
  isDatasetVisible,
  addToObject,
  toggleFromSubArray,
  addNumber,
  toggleFromArrayInKey,
  setStoreState,
}) => {
  const {
    currentGraph,
    graphData
  } = store.getState()

  const currentGraphObject = JSON.parse(JSON.stringify(graphData[currentGraph]))

  currentGraphObject.isUpperOntologyVisible = isUpperOntologyVisible
  currentGraphObject.isSubClassEdgeVisible = isSubClassEdgeVisible
  currentGraphObject.isDatasetVisible = isDatasetVisible

  addToObject('graphData', currentGraph, currentGraphObject)

  toggleElements({
    toggleFromSubArray,
    addNumber,
    toggleFromArrayInKey,
    setStoreState,
  })
}

export default setNetworkGraphOptions
