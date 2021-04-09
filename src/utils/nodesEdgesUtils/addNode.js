/* eslint no-console:0 */
import { OPERATION_TYPE_ADD, OPERATION_TYPE_PUSH } from '../../constants/store'
import store from '../../store'
import getElementLabel from '../networkStyling/getElementLabel'
import setNodeStyle from '../networkStyling/setNodeStyle'
import getNode from './getNode'

/**
 * Add node to graph
 * @param  {Object}     params
 * @param  {Object}     params.node                  Node object with at least id and label keys
 * @param  {Function}   params.updateStoreValue      updateStoreValue action
 * @return { undefined }
\ */
const addNode = ({
  node,
  updateStoreValue,
}) => {
  const {
    availableNodes
  } = store.getState()

  const { id } = node
  const isVisible = getNode(id)

  if (isVisible !== null) return false

  const label = getElementLabel({
    type: 'node',
    id
  })

  availableNodes.add({
    ...node,
    label,
    title: label,
    x: Math.floor((Math.random() * 1500) + 1),
    y: Math.floor((Math.random() * 1500) + 1)
  })

  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_ADD, 1)
  updateStoreValue(['nodesDropdownLabels'], OPERATION_TYPE_PUSH, {
    value: id,
    label: label || id
  })

  setNodeStyle({
    node,
  })
}

export default addNode
