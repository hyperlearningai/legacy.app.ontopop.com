import store from '../../store'
import toggleElements from './toggleElements'

/**
 * Set network graph options
 * @param  {Object}   params
 * @param  {Function} params.addNumber                 addNumber action
 * @param  {Function} params.addToObject               Add to object action
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.toggleFromArrayInKey      toggleFromArrayInKey action
 * @param  {Object}   params.hiddenNodesProperties     Properties to hide nodes
 * @param  {Object}   params.hiddenEdgesProperties     Properties to hide edges
 * @param  {Boolean}  params.isUpperOntologyVisible    Show upper ontology flag
 * @param  {Boolean}  params.isSubClassEdgeVisible     Show subclass edges flag
 * @param  {Boolean}  params.isDatasetVisible          Show dataset nodes flag
 * @return { undefined }
 */
const setNetworkGraphOptions = ({
  isUpperOntologyVisible,
  isSubClassEdgeVisible,
  isDatasetVisible,
  hiddenNodesProperties,
  hiddenEdgesProperties,
  addToObject,
  addNumber,
  toggleFromArrayInKey,
  setStoreState,
}) => {
  const {
    currentGraph,
    graphData
  } = store.getState()

  const currentGraphObject = {
    ...graphData[currentGraph],
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties,
  }

  addToObject('graphData', currentGraph, currentGraphObject)

  toggleElements({
    addNumber,
    toggleFromArrayInKey,
    setStoreState
  })
}

export default setNetworkGraphOptions
