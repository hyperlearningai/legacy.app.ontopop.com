import { USER_DEFINED_PROPERTY } from '../../constants/graph'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set user defined node style
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node ID
 * @return { undefined }
 */
const setUserDefinedNodeStyle = ({
  nodeId
}) => {
  const {
    userDefinedNodeStyling,
    classesFromApi
  } = store.getState()

  const node = getNode(nodeId)

  if (!node || !node[USER_DEFINED_PROPERTY]) return false

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
  } = userDefinedNodeStyling

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

export default setUserDefinedNodeStyle
