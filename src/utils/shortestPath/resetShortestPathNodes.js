import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import setNodesStyle from '../networkStyling/setNodesStyle'

/**
 * Reset shortest path nodes
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue      updateStoreValue action
 * @return { undefined }
 */
const resetShortestPathNodes = ({
  updateStoreValue,
}) => {
  setNodesStyle()

  updateStoreValue(['isShortestPathNode1Selectable'], OPERATION_TYPE_UPDATE, false)
  updateStoreValue(['isShortestPathNode2Selectable'], OPERATION_TYPE_UPDATE, false)
  updateStoreValue(['shortestPathNode1'], OPERATION_TYPE_UPDATE, '')
  updateStoreValue(['shortestPathNode2'], OPERATION_TYPE_UPDATE, '')
  updateStoreValue(['shortestPathNode1Object'], OPERATION_TYPE_UPDATE, undefined)
  updateStoreValue(['shortestPathNode2Object'], OPERATION_TYPE_UPDATE, undefined)
}

export default resetShortestPathNodes
