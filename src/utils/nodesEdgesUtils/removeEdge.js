import { OPERATION_TYPE_TOGGLE, OPERATION_TYPE_ADD, OPERATION_TYPE_ARRAY_DELETE_INDEX } from '../../constants/store'
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
    availableEdges,
    dataTableTriples
  } = store.getState()

  const {
    from,
    to,
    id
  } = edge

  const isVisible = getEdge(id)

  if (isVisible === null) return false

  availableEdges.remove(id)

  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_ADD, -1)

  // remove from datatable rows
  if (dataTableTriples.length > 0) {
    const edgeIndex = dataTableTriples.findIndex((triple) => triple.edge === id)

    updateStoreValue(['dataTableTriples'], OPERATION_TYPE_ARRAY_DELETE_INDEX, edgeIndex)
    updateStoreValue(['dataTableTriplesWithLabels'], OPERATION_TYPE_ARRAY_DELETE_INDEX, edgeIndex)
  }

  updateStoreValue(['nodesEdges', from], OPERATION_TYPE_TOGGLE, id)
  updateStoreValue(['nodesEdges', to], OPERATION_TYPE_TOGGLE, id)
}

export default removeEdge
