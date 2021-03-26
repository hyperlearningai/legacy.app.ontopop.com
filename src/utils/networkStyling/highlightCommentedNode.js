import { COMMENTED_NODE_BORDER_COLOR, COMMENTED_NODE_BORDER_WIDTH } from '../../constants/graph'
import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight commented nodes borders
 * @param  {Object}   params
 * @param  {String}   params.node           Node object
 * @return { undefined }
 */
const highlightCommentedNode = ({ node }) => {
  const {
    globalNodeStyling,
    userDefinedNodeStyling,
    nodesNotes
  } = store.getState()

  let isCommented = false

  const { id, userDefined } = node

  if (nodesNotes.length > 0) {
    isCommented = nodesNotes.filter((note) => note.nodeId.toString() === id).length > 0
  }

  const {
    stylingNodeBorderColor,
    stylingNodeBorder
  } = userDefined ? userDefinedNodeStyling : globalNodeStyling

  return updateNodes({
    id,
    color: {
      border: isCommented
        ? COMMENTED_NODE_BORDER_COLOR : stylingNodeBorderColor
    },
    borderWidth: isCommented
      ? COMMENTED_NODE_BORDER_WIDTH
      : stylingNodeBorder
  })
}

export default highlightCommentedNode
