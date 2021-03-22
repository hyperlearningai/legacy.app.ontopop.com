import store from '../../store'
import getEdge from './getEdge'

/**
 * Remove edge from graph
 * @param  {String}     edgeId                          Edge id
 * @param  {Function}   params.addNumber                Add number action
 * @param  {Function}   params.toggleFromArrayInKey     toggleFromArrayInKey action
 * @return { undefined }
\ */
const removeEdge = ({
  edge,
  addNumber,
  toggleFromArrayInKey
}) => {
  const {
    availableEdges
  } = store.getState()

  const isVisible = getEdge(edge.id)

  if (isVisible === null) return false

  availableEdges.remove(edge.id)

  addNumber('availableEdgesCount', -1)

  const {
    from,
    to,
    id
  } = edge

  toggleFromArrayInKey('nodesEdges', from, id)
  toggleFromArrayInKey('nodesEdges', to, id)
}

export default removeEdge
