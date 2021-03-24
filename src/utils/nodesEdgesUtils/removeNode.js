import { OPERATION_TYPE_ADD } from '../../constants/store'
import store from '../../store'
import getEdge from './getEdge'
import getNode from './getNode'
import removeEdge from './removeEdge'

/**
 * Remove node from graph
 * @param  {String}     nodeId                            Node id
 * @param  {Function}   params.updateStoreValue           updateStoreValue action
 * @return { undefined }
\ */
const removeNode = ({
  nodeId,
  updateStoreValue
}) => {
  const {
    availableNodes,
  } = store.getState()

  const isVisible = getNode(nodeId)

  if (isVisible === null) return false

  availableNodes.remove(nodeId)
  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_ADD, -1)

  // delete connected edges
  const edges = getEdge({
    filter: (edge) => edge.from === nodeId || edge.to === nodeId
  })

  if (edges.length > 0) {
    edges.map((edge) => removeEdge({
      edge,
      updateStoreValue
    }))
  }
}

export default removeNode
