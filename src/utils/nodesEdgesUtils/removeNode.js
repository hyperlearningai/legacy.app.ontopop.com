import store from '../../store'
import getEdge from './getEdge'
import getNode from './getNode'
import removeEdge from './removeEdge'

/**
 * Remove node from graph
 * @param  {String}     nodeId                            Node id
 * @param  {Function}   params.addNumber                  Add number action
 * @param  {Function}   params.toggleFromArrayInKey       Add number action
 * @return { undefined }
\ */
const removeNode = ({
  nodeId,
  addNumber,
  toggleFromArrayInKey
}) => {
  const {
    availableNodes,
  } = store.getState()

  const isVisible = getNode(nodeId)

  if (isVisible === null) return false

  availableNodes.remove(nodeId)
  addNumber('availableNodesCount', -1)

  // delete connected edges
  const edges = getEdge({
    filter: (edge) => edge.from === nodeId || edge.to === nodeId
  })

  if (edges.length > 0) {
    edges.map((edge) => removeEdge({
      edge,
      addNumber,
      toggleFromArrayInKey
    }))
  }
}

export default removeNode
