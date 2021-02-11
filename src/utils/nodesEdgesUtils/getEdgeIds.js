import store from '../../store'

/**
 * Get edge ids
 * @return {Array} edgeIds    Array of edge IDs
\ */
const getEdgeIds = () => {
  const {
    availableEdges
  } = store.getState()

  return availableEdges.getIds()
}

export default getEdgeIds
