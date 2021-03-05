import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import store from '../../store'
import { USER_DEFINED_PROPERTY } from '../../constants/graph'

/**
 * Set user defined edge style
 * @param  {Object}   params
 * @param  {String}   params.edgeId           Edge Id
 * @return { undefined }
 */
const setUserDefinedEdgesStyles = ({
  edgeId
}) => {
  const {
    userDefinedEdgeStyling,
    objectPropertiesFromApi
  } = store.getState()

  const edge = getEdge(edgeId)

  if (!edge || !edge[USER_DEFINED_PROPERTY]) return false

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

export default setUserDefinedEdgesStyles
