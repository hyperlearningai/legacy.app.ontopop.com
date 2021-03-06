import updateEdges from '../nodesEdgesUtils/updateEdges'
import store from '../../store'

/**
 * Set user defined edge style
 * @param  {Object}   params
 * @param  {String}   params.edge           Edge object
 * @return { undefined }
 */
const setUserDefinedEdgeStyle = ({
  edge
}) => {
  const {
    userDefinedEdgeStyling,
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
  updateEdges({
    ...edge,
    ...edgeStyle,
    label: objectPropertiesFromApi[edge.id][stylingEdgeCaptionProperty]
      ? objectPropertiesFromApi[edge.id][stylingEdgeCaptionProperty].replace(/ /g, '\n')
      : ''
  })
}

export default setUserDefinedEdgeStyle
