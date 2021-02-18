import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Reset selected node style
 * @param  {Object}   params
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const resetSelectedNode = ({
  setStoreState
}) => {
  const {
    stylingNodeBackgroundColor,
    prevSelectedNode
  } = store.getState()

  if (!prevSelectedNode) return false

  const color = prevSelectedNode.color || {
    background: stylingNodeBackgroundColor
  }

  color.background = stylingNodeBackgroundColor

  updateNodes({
    id: prevSelectedNode.id,
    color
  })

  setStoreState('prevSelectedNode', undefined)
}

export default resetSelectedNode
