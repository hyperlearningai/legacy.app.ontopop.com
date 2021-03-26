import { OPERATION_TYPE_ADD, OPERATION_TYPE_PUSH_UNIQUE } from '../../constants/store'
import store from '../../store'
import getElementLabel from '../networkStyling/getElementLabel'
import setEdgeStyle from '../networkStyling/setEdgeStyle'
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

  const { id } = edge
  const isVisible = getEdge(id)

  if (isVisible !== null) return false

  const label = getElementLabel({
    type: 'edge',
    id
  })

  availableEdges.add({
    ...edge,
    label
  })

  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_ADD, 1)

  const {
    from,
    to
  } = edge

  updateStoreValue(['nodesEdges', from], OPERATION_TYPE_PUSH_UNIQUE, id)
  updateStoreValue(['nodesEdges', to], OPERATION_TYPE_PUSH_UNIQUE, id)

  setEdgeStyle({
    edge
  })
}

export default addEdge
