import store from '../../store'

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
