import {
  SPIDERABLE_NODE_BORDER_COLOR,
  SPIDERABLE_NODE_BORDER_COLOR_HIDDEN,
  SPIDERABLE_NODE_BORDER_WIDTH
} from '../../constants/graph'
import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {String}   params.node           Node object
 * @return { undefined }
 */
const highlightSpiderableNode = ({
  node
}) => {
  const {
    globalNodeStyling,
    userDefinedNodeStyling,
    nodesSpiderability
  } = store.getState()

  const {
    id,
    userDefined
  } = node

  const {
    stylingNodeBorderColor,
    stylingNodeBorder
  } = userDefined ? userDefinedNodeStyling : globalNodeStyling

  const isSpiderable = nodesSpiderability[id]

  let border
  let borderWidth

  switch (isSpiderable) {
    case 'true':
      border = SPIDERABLE_NODE_BORDER_COLOR
      borderWidth = SPIDERABLE_NODE_BORDER_WIDTH
      break
    case 'hidden':
      border = SPIDERABLE_NODE_BORDER_COLOR_HIDDEN
      borderWidth = SPIDERABLE_NODE_BORDER_WIDTH
      break
    default:
      border = stylingNodeBorderColor
      borderWidth = stylingNodeBorder
      break
  }

  updateNodes({
    id,
    color: {
      border
    },
    borderWidth
  })
}

export default highlightSpiderableNode
