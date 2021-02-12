import { STYLING_LS } from '../../constants/localStorage'
import store from '../../store'

/**
 * Save styling to local storage
 * @return {undefined}
 */
const saveStyling = ({
  setSaved
}) => {
  const {
    stylingNodeShape,
    stylingNodeSize,
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeBorderColor,
    stylingNodeBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeTextColor,
    stylingNodeTextFontSize,
    stylingNodeTextFontAlign,
    stylingNodeCaptionProperty,
    stylingNodeByProperty,
    stylingEdgeLength,
    stylingEdgeWidth,
    stylingEdgeLineStyle,
    stylingEdgeLineColor,
    stylingEdgeLineColorHover,
    stylingEdgeLineColorHighlight,
    stylingEdgeCaptionProperty,
    stylingEdgeTextColor,
    stylingEdgeTextSize,
    stylingEdgeTextAlign,
    stylingEdgeByProperty
  } = store.getState()

  const stylingJSON = JSON.stringify({
    stylingNodeShape,
    stylingNodeSize,
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeBorderColor,
    stylingNodeBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeTextColor,
    stylingNodeTextFontSize,
    stylingNodeTextFontAlign,
    stylingNodeCaptionProperty,
    stylingNodeByProperty,
    stylingEdgeLength,
    stylingEdgeWidth,
    stylingEdgeLineStyle,
    stylingEdgeLineColor,
    stylingEdgeLineColorHover,
    stylingEdgeLineColorHighlight,
    stylingEdgeCaptionProperty,
    stylingEdgeTextColor,
    stylingEdgeTextSize,
    stylingEdgeTextAlign,
    stylingEdgeByProperty
  })

  localStorage.setItem(STYLING_LS, stylingJSON)

  setSaved(true)

  setTimeout(() => setSaved(false), 5000)
}

export default saveStyling
