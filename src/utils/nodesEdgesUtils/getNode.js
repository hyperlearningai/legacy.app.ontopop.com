import store from '../../store'

/**
 * Get node properties
 * @param  {String}   nodeId    Node id
 * @return { undefined }
\ */
const getNode = (nodeId) => {
  const {
    availableNodes
  } = store.getState()

  return availableNodes.get(nodeId)
}

export default getNode
