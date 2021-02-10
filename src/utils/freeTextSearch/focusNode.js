import { HIGHLIGHT_NODE_BACKGROUND } from '../../constants/graph'
import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {String}   params.elementId               Node id
 * @param  {Function} params.setPrevSelectedNode     update previously selected node
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const focusNode = ({
  elementId,
  setPrevSelectedNode,
  setStoreState
}) => {
  const {
    network,
  } = store.getState()

  updateNodes(
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
