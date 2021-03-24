import { OPERATION_TYPE_ADD, OPERATION_TYPE_TOGGLE } from '../../constants/store'
import store from '../../store'
import getEdge from './getEdge'

/**
 * Add edge to graph
 * @param  {Object}     params
 * @param  {Object}     params.edge                  Edge object with at least id and label keys
 * @param  {Function}   params.updateStoreValue      updateStoreValue action
 * @return { undefined }
\ */
const addEdge = ({
  edge,
  updateStoreValue,
}) => {
  const {
    availableEdges
  } = store.getState()

  const isVisible = getEdge(edge.id)

  if (isVisible !== null) return false

  availableEdges.add(edge)
  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_ADD, 1)

  const {
    from,
    to,
    id
  } = edge

  updateStoreValue(['nodesEdges', from], OPERATION_TYPE_TOGGLE, id)
  updateStoreValue(['nodesEdges', to], OPERATION_TYPE_TOGGLE, id)
}

export default addEdge
