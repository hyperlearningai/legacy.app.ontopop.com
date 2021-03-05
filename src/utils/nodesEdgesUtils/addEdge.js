import store from '../../store'
import setEdgeStyle from '../networkStyling/setEdgeStyle'

/**
 * Add edge to graph
 * @param  {Object}   edgeObject    Edge object with at least id and label keys
 * @return { undefined }
\ */
const addEdge = (edgeObject) => {
  const {
    availableEdges
  } = store.getState()

  const isEdgeNotVisible = availableEdges.get(edgeObject.id) === null

  if (isEdgeNotVisible) {
    availableEdges.add(edgeObject)
    setEdgeStyle({ edgeId: edgeObject.id })
  }
}

export default addEdge
