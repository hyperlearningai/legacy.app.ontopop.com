import { OPERATION_TYPE_TOGGLE, OPERATION_TYPE_ADD } from '../../constants/store'
import store from '../../store'
import getEdge from './getEdge'

/**
 * Remove edge from graph
 * @param  {String}     edgeId                          Edge id
 * @param  {Function}   params.updateStoreValue         updateStoreValue action
 * @return { undefined }
\ */
const removeEdge = ({
  edge,
  updateStoreValue
}) => {
  const {
    availableEdges
  } = store.getState()

  const isVisible = getEdge(edge.id)

  if (isVisible === null) return false

  availableEdges.remove(edge.id)

  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_ADD, -1)

  const {
    from,
    to,
    id
  } = edge

  updateStoreValue(['nodesEdges', from], OPERATION_TYPE_TOGGLE, id)
  updateStoreValue(['nodesEdges', to], OPERATION_TYPE_TOGGLE, id)
}

export default removeEdge
