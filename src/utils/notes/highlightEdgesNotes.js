import { NOTE_EDGE_BORDER_COLOR, NOTE_EDGE_BORDER_WIDTH } from '../../constants/graph'
import store from '../../store'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Highlight edges notes borders
 * @return { undefined }
 */
const highlightEdgesNotes = () => {
  const {
    notes,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  const availableEdgeIDs = getEdgeIds()

  if (availableEdgeIDs.length > 0) {
    availableEdgeIDs.map((edgeId) => {
      const edge = getEdge(edgeId)

      const { userDefined } = edge

      const {
        stylingEdgeLineColor,
        stylingEdgeWidth
      } = userDefined ? userDefinedNodeStyling : globalNodeStyling

      let existingColorProperties

      if (edge.color) {
        existingColorProperties = edge.color
      }

      const hasNote = notes.find((note) => note.edgeId === parseInt(edgeId))
      return updateEdges({
        id: edgeId,
        color: {
          ...existingColorProperties,
          color: hasNote ? NOTE_EDGE_BORDER_COLOR : stylingEdgeLineColor
        },
        width: hasNote ? NOTE_EDGE_BORDER_WIDTH : stylingEdgeWidth
      })
    })
  }
}

export default highlightEdgesNotes
