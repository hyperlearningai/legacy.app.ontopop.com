import updateNodes from '../nodesEdgesUtils/updateNodes'
import store from '../../store'

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
    classesFromApi
  } = store.getState()

  const {
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeTextFontSize,
    stylingNodeTextColor,
    stylingNodeTextFontAlign,
    stylingNodeShape,
    stylingNodeBackgroundColor,
    stylingNodeBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeSize,
    stylingNodeCaptionProperty,
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
      background: stylingNodeBackgroundColor,
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
    label: classesFromApi[node.id][stylingNodeCaptionProperty]
      ? classesFromApi[node.id][stylingNodeCaptionProperty].replace(/ /g, '\n')
      : ''
  })
}

export default resetNodeStyle
