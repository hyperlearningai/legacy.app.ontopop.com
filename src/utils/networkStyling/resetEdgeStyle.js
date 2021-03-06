import updateEdges from '../nodesEdgesUtils/updateEdges'
import store from '../../store'

/**
 * Reset edges which have been styled
 * @param  {Object}   params
 * @param  {String}   params.edgeId           Edge Id
 * @return { undefined }
 */
const resetEdgeStyle = ({
  edge
}) => {
  const {
    globalEdgeStyling,
    objectPropertiesFromApi
  } = store.getState()

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
  } = globalEdgeStyling

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
  return updateEdges({
    ...edge,
    ...edgeStyle,
    label: objectPropertiesFromApi[edge.id][stylingEdgeCaptionProperty]
      ? objectPropertiesFromApi[edge.id][stylingEdgeCaptionProperty].replace(/ /g, '\n')
      : ''
  })
}

export default resetEdgeStyle
