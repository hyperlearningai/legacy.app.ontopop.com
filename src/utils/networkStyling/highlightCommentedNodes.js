import { uniq } from 'lodash'
import { COMMENTED_NODE_BORDER_COLOR, COMMENTED_NODE_BORDER_WIDTH } from '../../constants/graph'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight commented nodes borders
 * @return { undefined }
 */
const highlightCommentedNodes = () => {
  const {
    globalNodeStyling,
    userDefinedNodeStyling,
    nodesNotes
  } = store.getState()

  if (nodesNotes.length === 0) return false

  const nodesNotesIds = uniq(nodesNotes.map((note) => note.nodeId.toString()))

  if (nodesNotesIds.length === 0) return false

  nodesNotesIds.map((nodeId) => {
    const node = getNode(nodeId)

    if (node === null) return false

    const { userDefined } = node

    const {
      stylingNodeBorderColor,
      stylingNodeBorder
    } = userDefined ? userDefinedNodeStyling : globalNodeStyling

    const isCommented = nodesNotesIds.includes(node.id)

    if (!isCommented) return false

    return updateNodes({
      id: nodeId,
      color: {
        border: isCommented
          ? COMMENTED_NODE_BORDER_COLOR : stylingNodeBorderColor
      },
      borderWidth: isCommented
        ? COMMENTED_NODE_BORDER_WIDTH
        : stylingNodeBorder
    })
  })
}

export default highlightCommentedNodes
