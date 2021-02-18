import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import store from '../../store'

/**
 * Reset edges which have been styled
 * @return { undefined }
 */
const resetEdgesStyles = () => {
  const {
    stylingEdgeLineColor,
    stylingEdgeLineColorHighlight,
    stylingEdgeLineColorHover,
    stylingEdgeTextColor,
    stylingEdgeTextSize,
    stylingEdgeTextAlign,
    stylingEdgeWidth,
    stylingEdgeLineStyle
  } = store.getState()

  const styleProperties = ['color', 'font', 'width', 'dashes']

  const edgesToReset = getEdge({
    filter: (edge) => styleProperties.some((styleProperty) => edge[styleProperty])
  })

  if (edgesToReset.length > 0) {
    edgesToReset.map((edge) => {
      const { id } = edge

      const propertyToUpdate = {
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

      updateEdges({
        id,
        ...propertyToUpdate
      })

      return true
    })
  }
}

export default resetEdgesStyles
