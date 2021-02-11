import store from '../../store'

/**
 * Count edges in graph
 * @return {Number} edgesLength   Available edges length
\ */
const countEdges = () => {
  const {
    availableEdges
  } = store.getState()

  return availableEdges.length
}

export default countEdges
