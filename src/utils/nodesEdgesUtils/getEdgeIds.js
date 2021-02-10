import store from '../../store'

const getEdgeIds = () => {
  const {
    availableEdges
  } = store.getState()

  return availableEdges.getIds()
}

export default getEdgeIds
