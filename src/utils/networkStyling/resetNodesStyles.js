import updateNodes from '../nodesEdgesUtils/updateNodes'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import { NODE_TYPE, USER_DEFINED_PROPERTY } from '../../constants/graph'
import getElementLabel from './getElementLabel'

/**
 * Reset nodes which have been styled
 * @return { undefined }
 */
const resetNodesStyles = () => {
  const {
    globalNodeStyling,
  } = store.getState()

  const availableNodes = getNode({
    filter: (node) => !node[USER_DEFINED_PROPERTY]
  })

  if (availableNodes.length === 0) return false

  const {
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeTextFontSize,
    stylingNodeTextColor,
    stylingNodeTextFontAlign,
    stylingNodeShape,
    stylingNodeBackgroundColor,
    stylingNodeBackgroundColorDataset,
    stylingNodeBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeSize,
  } = globalNodeStyling

  const nodeStyle = (node) => ({
    borderWidth: stylingNodeBorder,
    borderWidthSelected: stylingNodeBorderSelected,
    font: {
      size: stylingNodeTextFontSize,
      color: stylingNodeTextColor,
      align: stylingNodeTextFontAlign,
      face: 'Montserrat',
      bold: '700'
    },
    shape: stylingNodeShape,
    color: {
      background: node[NODE_TYPE] === 'class' ? stylingNodeBackgroundColor : stylingNodeBackgroundColorDataset,
      border: stylingNodeBorderColor,
      highlight: {
        background: stylingNodeHighlightBackgroundColor,
        border: stylingNodeHighlightBorderColor,
      },
      hover: {
        background: stylingNodeHoverBackgroundColor,
        border: stylingNodeHoverBorderColor,
      },
    },
    size: stylingNodeSize
  })

  // update node style
  availableNodes.map((node) => {
    const nodeWithoutCoordinates = JSON.parse(JSON.stringify(node))
    delete nodeWithoutCoordinates.x
    delete nodeWithoutCoordinates.y

    const nodeStyleObject = nodeStyle(node)

    return updateNodes({
      ...nodeWithoutCoordinates,
      ...nodeStyleObject,
      label: getElementLabel({
        type: 'node',
        id: node.id
      })
    })
  })
}

export default resetNodesStyles
