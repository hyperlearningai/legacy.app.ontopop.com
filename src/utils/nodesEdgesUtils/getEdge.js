import store from '../../store'

/**
 * Get edge properties
 * @param  {String}   edgeId    Edge id
 * @return { undefined }
\ */
const getEdge = (edgeId) => {
  const {
    availableEdges
  } = store.getState()

  return availableEdges.get(edgeId)
}

export default getEdge
