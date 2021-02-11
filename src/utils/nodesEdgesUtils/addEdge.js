import store from '../../store'

/**
 * Add edge to graph
 * @param  {Object}   edgeObject    Edge object with at least id and label keys
 * @return { undefined }
\ */
const addEdge = (edgeObject) => {
  const {
    availableEdges
  } = store.getState()

  const edgeIdObject = availableEdges.get(edgeObject.id)

  if (edgeIdObject === null) {
    availableEdges.add(edgeObject)
  }
}

export default addEdge
