import store from '../../store'

/**
 * Get node ids
 * @return {Array} nodeIds    Array of node IDs
\ */
const getNodeIds = () => {
  const {
    availableNodes
  } = store.getState()

  return availableNodes.getIds()
}

export default getNodeIds
