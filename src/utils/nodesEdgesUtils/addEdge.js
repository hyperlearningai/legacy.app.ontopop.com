import store from '../../store'

/**
 * Add edge to graph
 * @param  {Object}     params
 * @param  {Object}     params.edge           Edge object with at least id and label keys
 * @param  {function}   params.addNumber      Add number action
 * @return { undefined }
\ */
const addEdge = ({ edge, addNumber }) => {
  const {
    availableEdges
  } = store.getState()

  try {
    availableEdges.add(edge)
    addNumber('availableEdgesCount', 1)
  } catch (error) {
    return error
  }
}

export default addEdge
