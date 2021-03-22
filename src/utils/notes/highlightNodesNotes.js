import {
  NOTE_NODE_BORDER_COLOR,
  NOTE_NODE_BORDER_WIDTH,
} from '../../constants/graph'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight nodes notes borders
 * @return { undefined }
 */
const highlightNodesNotes = () => {
  const {
    notes,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  const availableNodesIDs = getNodeIds()

  if (availableNodesIDs.length > 0) {
    availableNodesIDs.map((nodeId) => {
      const node = getNode(nodeId)

      const { userDefined } = node

      const {
        stylingNodeBorderColor,
        stylingNodeBorder
      } = userDefined ? userDefinedNodeStyling : globalNodeStyling

      let existingColorProperties

      if (node.color) {
        existingColorProperties = node.color
      }

      const hasNote = notes.find((note) => note.nodeId === parseInt(nodeId))

      return updateNodes({
        id: nodeId,
        color: {
          ...existingColorProperties,
          border: hasNote ? NOTE_NODE_BORDER_COLOR : stylingNodeBorderColor
        },
        borderWidth: hasNote ? NOTE_NODE_BORDER_WIDTH : stylingNodeBorder
      })
    })
  }
}

export default highlightNodesNotes
