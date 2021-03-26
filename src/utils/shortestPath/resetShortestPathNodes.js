import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import setNodeStyle from '../networkStyling/setNodeStyle'

/**
 * Reset shortest path nodes
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue      updateStoreValue action
 * @return { undefined }
 */
const resetShortestPathNodes = ({
  updateStoreValue,
}) => {
  const {
    shortestPathNode1,
    shortestPathNode2,
    classesFromApi
  } = store.getState()

  const node1 = classesFromApi[shortestPathNode1]
  if (node1) {
    setNodeStyle({
      node: node1
    })
  }

  const node2 = classesFromApi[shortestPathNode2]
  if (node2) {
    setNodeStyle({
      node: node2
    })
  }

  updateStoreValue(['isShortestPathNode1Selectable'], OPERATION_TYPE_UPDATE, false)
  updateStoreValue(['isShortestPathNode2Selectable'], OPERATION_TYPE_UPDATE, false)
  updateStoreValue(['shortestPathNode1'], OPERATION_TYPE_UPDATE, '')
  updateStoreValue(['shortestPathNode2'], OPERATION_TYPE_UPDATE, '')
  updateStoreValue(['shortestPathNode1Object'], OPERATION_TYPE_UPDATE, undefined)
  updateStoreValue(['shortestPathNode2Object'], OPERATION_TYPE_UPDATE, undefined)
}

export default resetShortestPathNodes
