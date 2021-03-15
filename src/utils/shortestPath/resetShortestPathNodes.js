import setNodesStyle from '../networkStyling/setNodesStyle'

/**
 * Reset shortest path nodes
 * @param  {Object}   params
 * @param  {Function} params.setStoreState      setStoreState action
 * @return { undefined }
 */
const resetShortestPathNodes = ({
  setStoreState,
}) => {
  setNodesStyle()

  setStoreState('isShortestPathNode1Selectable', false)
  setStoreState('isShortestPathNode2Selectable', false)
  setStoreState('shortestPathNode1', '')
  setStoreState('shortestPathNode2', '')
  setStoreState('shortestPathNode1Object', undefined)
  setStoreState('shortestPathNode2Object', undefined)
}

export default resetShortestPathNodes
