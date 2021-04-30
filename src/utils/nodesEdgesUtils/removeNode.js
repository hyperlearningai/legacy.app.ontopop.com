import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getEdge from './getEdge'
import getNode from './getNode'
import removeEdge from './removeEdge'

/**
 * Remove node from graph
* @param   {Object}     params
 * @param  {String}     params.nodeId                     Node id
 * @param  {Function}   params.updateStoreValue           updateStoreValue action
 * @return { undefined }
\ */
const removeNode = ({
  nodeId,
  updateStoreValue,
}) => {
  const {
    availableNodes,
    nodesDropdownLabels
  } = store.getState()

  const isVisible = getNode(nodeId)

  if (isVisible === null) return false

  availableNodes.remove(nodeId)
  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_ADD, -1)

  // remove from labels
  const updatedDropdownLabels = nodesDropdownLabels.slice()
  const nodeIndex = updatedDropdownLabels.findIndex((node) => node.value === nodeId)

  if (nodeIndex > -1) {
    updatedDropdownLabels.splice(nodeIndex, 1)
    updateStoreValue(['nodesDropdownLabels'], OPERATION_TYPE_UPDATE, updatedDropdownLabels)
  }

  // delete connected edges
  const edges = getEdge({
    filter: (edge) => edge.from === nodeId || edge.to === nodeId
  })

  if (edges.length === 0) return false

  const edgesLength = edges.length - 1
  for (let index = edgesLength; index >= 0; index--) {
    const edge = edges[edgesLength - index]

    removeEdge({
      edge,
      updateStoreValue
    })
  }
}

export default removeNode
