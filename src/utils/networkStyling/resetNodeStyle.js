import updateNodes from '../nodesEdgesUtils/updateNodes'
import store from '../../store'
import { NODE_TYPE } from '../../constants/graph'
import getElementLabel from './getElementLabel'

/**
 * Reset nodes which have been styled
 * @param  {Object}   params
 * @param  {String}   params.node  Node object
 * @return { undefined }
 */
const resetNodeStyle = ({
  node
}) => {
  const {
    globalNodeStyling,
  } = store.getState()

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

  const nodeStyle = {
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
  }

  // update node style
  const nodeWithoutCoordinates = JSON.parse(JSON.stringify(node))
  delete nodeWithoutCoordinates.x
  delete nodeWithoutCoordinates.y

  return updateNodes({
    ...nodeWithoutCoordinates,
    ...nodeStyle,
    label: getElementLabel({
      type: 'node',
      id: node.id
    })
  })
}

export default resetNodeStyle
