import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import store from '../../store'
import { USER_DEFINED_PROPERTY } from '../../constants/graph'

/**
 * Set user defined edges styles
 * @return { undefined }
 */
const setUserDefinedEdgesStyles = () => {
  const {
    userDefinedEdgeStyling,
    objectPropertiesFromApi
  } = store.getState()

  const availableEdges = getEdge({
    filter: (edge) => edge[USER_DEFINED_PROPERTY] === true
  })

  if (availableEdges.length === 0) return false

  const {
    stylingEdgeLineColor,
    stylingEdgeLineColorHighlight,
    stylingEdgeLineColorHover,
    stylingEdgeTextColor,
    stylingEdgeTextSize,
    stylingEdgeTextAlign,
    stylingEdgeWidth,
    stylingEdgeLineStyle,
    stylingEdgeCaptionProperty,
  } = userDefinedEdgeStyling

  const edgeStyle = {
    smooth: {
      type: 'cubicBezier', // 'continuous'
      forceDirection: 'none',
      roundness: 0.45,
    },
    arrows: { to: true },
    color: {
      color: stylingEdgeLineColor,
      highlight: stylingEdgeLineColorHighlight,
      hover: stylingEdgeLineColorHover,
      inherit: 'from',
      opacity: 1.0
    },
    font: {
      color: stylingEdgeTextColor,
      size: stylingEdgeTextSize,
      align: stylingEdgeTextAlign
    },
    labelHighlightBold: true,
    selectionWidth: 3,
    width: stylingEdgeWidth,
    dashes: stylingEdgeLineStyle
  }

  // update edge style
  const availableEdgesLength = availableEdges.length - 1

  for (let index = availableEdgesLength; index >= 0; index--) {
    const edge = availableEdges[availableEdgesLength - index]

    updateEdges({
      ...edge,
      ...edgeStyle,
      label: objectPropertiesFromApi[edge.id][stylingEdgeCaptionProperty]
        ? objectPropertiesFromApi[edge.id][stylingEdgeCaptionProperty].replace(/ /g, '\n')
        : ''
    })
  }
}

export default setUserDefinedEdgesStyles
