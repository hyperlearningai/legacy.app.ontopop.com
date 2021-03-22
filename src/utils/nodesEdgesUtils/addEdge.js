import store from '../../store'
import getEdge from './getEdge'

/**
 * Add edge to graph
 * @param  {Object}     params
 * @param  {Object}     params.edge           Edge object with at least id and label keys
 * @param  {Function}   params.addNumber      Add number action
 * @return { undefined }
\ */
const addEdge = ({
  edge,
  addNumber,
  toggleFromArrayInKey
}) => {
  const {
    availableEdges
  } = store.getState()

  const isVisible = getEdge(edge.id)

  if (isVisible !== null) return false

  availableEdges.add(edge)
  addNumber('availableEdgesCount', 1)

  const {
    from,
    to,
    id
  } = edge

  toggleFromArrayInKey('nodesEdges', from, id)
  toggleFromArrayInKey('nodesEdges', to, id)
}

export default addEdge
