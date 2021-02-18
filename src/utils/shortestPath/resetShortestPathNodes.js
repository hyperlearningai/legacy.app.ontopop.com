import store from '../../store'
import updateNodeBackground from './updateNodeBackground'

/**
 * Reset shortest path nodes
 * @param  {Object}   params
 * @param  {Function} params.setStoreState      setStoreState action
 * @return { undefined }
 */
const resetShortestPathNodes = ({
  setStoreState,
}) => {
  const {
    shortestPathNode1,
    shortestPathNode2,
    stylingNodeBackgroundColor,
    shortestPathNode1Object,
    shortestPathNode2Object
  } = store.getState()

  updateNodeBackground({
    background: stylingNodeBackgroundColor,
    nodeId: shortestPathNode1,
    originalNode: shortestPathNode1Object,
  })
  updateNodeBackground({
    background: stylingNodeBackgroundColor,
    nodeId: shortestPathNode2,
    originalNode: shortestPathNode2Object,
  })

  setStoreState('isShortestPathNode1Selectable', false)
  setStoreState('isShortestPathNode2Selectable', false)
  setStoreState('shortestPathNode1', '')
  setStoreState('shortestPathNode2', '')
  setStoreState('shortestPathNode1Object', undefined)
  setStoreState('shortestPathNode2Object', undefined)
}

export default resetShortestPathNodes
