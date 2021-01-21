import { HIGHLIGHT_NODE_BACKGROUND } from '../constants/graph'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {Object}   params.availableNodes          Available nodes on canvas DataSet
 * @param  {String}   params.elementId               Node id
 * @param  {Object}   params.network                 Network object
 * @param  {Function} params.setPrevSelectedNode     update previously selected node
 * @param  {Function} params.setStoreState           setStoreState action
 * @return
 */
const focusNode = ({
  availableNodes,
  elementId,
  network,
  setPrevSelectedNode,
  setStoreState
}) => {
  availableNodes.update(
    [{ id: elementId, color: { background: HIGHLIGHT_NODE_BACKGROUND } }]
  )
  setPrevSelectedNode(elementId)
  network.focus(elementId,
    {
      animation: true
    })
  setStoreState('freeTextSelectedElement', elementId)
}

export default focusNode
