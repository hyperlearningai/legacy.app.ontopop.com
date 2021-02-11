import store from '../../store'

/**
 * Count nodes in graph
 * @return {Number} nodesLength   Available nodes length
\ */
const countNodes = () => {
  const {
    availableNodes
  } = store.getState()

  return availableNodes.length
}

export default countNodes
