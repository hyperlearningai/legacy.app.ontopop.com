import { USER_DEFINED_PROPERTY } from '../../constants/graph'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set user defined nodes styles
 * @return { undefined }
 */
const setUserDefinedNodesStyles = () => {
  const {
    userDefinedNodeStyling,
    classesFromApi
  } = store.getState()

  const availableNodes = getNode({
    filter: (node) => node[USER_DEFINED_PROPERTY] === true
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
  availableNodes.map((node) => {
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
  })
}

export default setUserDefinedNodesStyles
