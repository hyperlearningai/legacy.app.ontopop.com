/* eslint max-len:0 */
import saveStyling from '../../../utils/networkStyling/saveStyling'
import store from '../../../store'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
  NODE_TEXT_COLOR,
  NODE_BORDER,
  NODE_BACKGROUND,
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  NODE_DEFAULT_SHAPE,
  HOVER_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  LABEL_PROPERTY,
  NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
  SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT
} from '../../../constants/graph'

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

jest.useFakeTimers()

describe('saveStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      globalNodeStyling: {
        stylingNodeSize: 25,
        stylingNodeBorder: 1,
        stylingNodeTextColor: NODE_TEXT_COLOR,
        stylingNodeBorderSelected: 2,
        stylingNodeBorderColor: NODE_BORDER,
        stylingNodeBackgroundColor: NODE_BACKGROUND,
        stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
        stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
        stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
        stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
        stylingNodeShape: NODE_DEFAULT_SHAPE,
        stylingNodeTextFontSize: 12,
        stylingNodeTextFontAlign: 'center',
        stylingNodeCaptionProperty: LABEL_PROPERTY,
      },
      userDefinedNodeStyling: {
        stylingNodeSize: 25,
        stylingNodeBorder: 1,
        stylingNodeTextColor: NODE_TEXT_COLOR,
        stylingNodeBorderSelected: 2,
        stylingNodeBorderColor: NODE_BORDER,
        stylingNodeBackgroundColor: NODE_BACKGROUND,
        stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
        stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
        stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
        stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
        stylingNodeShape: NODE_DEFAULT_SHAPE,
        stylingNodeTextFontSize: 12,
        stylingNodeTextFontAlign: 'center',
        stylingNodeCaptionProperty: LABEL_PROPERTY,
      },
      stylingNodeByProperty: [
        JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
      ],
      globalEdgeStyling: {
        stylingEdgeLineColor: EDGE_COLOR,
        stylingEdgeLineColorHover: EDGE_COLOR,
        stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
        stylingEdgeLineStyle: false,
        stylingEdgeTextColor: EDGE_COLOR,
        stylingEdgeTextSize: 12,
        stylingEdgeTextAlign: 'horizontal',
        stylingEdgeWidth: 1,
        stylingEdgeLength: 250,
        stylingEdgeCaptionProperty: LABEL_PROPERTY,
      },
      userDefinedEdgeStyling: {
        stylingEdgeLineColor: EDGE_COLOR,
        stylingEdgeLineColorHover: EDGE_COLOR,
        stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
        stylingEdgeLineStyle: false,
        stylingEdgeTextColor: EDGE_COLOR,
        stylingEdgeTextSize: 12,
        stylingEdgeTextAlign: 'horizontal',
        stylingEdgeWidth: 1,
        stylingEdgeLength: 250,
        stylingEdgeCaptionProperty: LABEL_PROPERTY,
      },
      stylingEdgeByProperty: [
        JSON.parse(JSON.stringify(SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT)),
        JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
      ],
    }))

    const setSaved = jest.fn()

    const setItem = jest.fn()

    Storage.prototype.setItem = setItem

    await saveStyling({
      setSaved
    })

    expect(setItem).toHaveBeenCalledWith(
      'gv-styling',
      '{"globalNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1,"stylingNodeTextColor":"#000000","stylingNodeBorderSelected":2,"stylingNodeBorderColor":"#011e41","stylingNodeBackgroundColor":"#adefd1","stylingNodeHighlightBorderColor":"#009688","stylingNodeHighlightBackgroundColor":"#ffed00","stylingNodeHoverBackgroundColor":"#f2f2f2","stylingNodeHoverBorderColor":"#607d8b","stylingNodeShape":"circle","stylingNodeTextFontSize":12,"stylingNodeTextFontAlign":"center","stylingNodeCaptionProperty":"rdfsLabel"},"userDefinedNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1,"stylingNodeTextColor":"#000000","stylingNodeBorderSelected":2,"stylingNodeBorderColor":"#011e41","stylingNodeBackgroundColor":"#adefd1","stylingNodeHighlightBorderColor":"#009688","stylingNodeHighlightBackgroundColor":"#ffed00","stylingNodeHoverBackgroundColor":"#f2f2f2","stylingNodeHoverBorderColor":"#607d8b","stylingNodeShape":"circle","stylingNodeTextFontSize":12,"stylingNodeTextFontAlign":"center","stylingNodeCaptionProperty":"rdfsLabel"},"stylingNodeByProperty":[{"filterType":"equal","filterValue":"","styleType":"","styleValue":""}],"globalEdgeStyling":{"stylingEdgeLineColor":"#070b11","stylingEdgeLineColorHover":"#070b11","stylingEdgeLineColorHighlight":"#9c27b0","stylingEdgeLineStyle":false,"stylingEdgeTextColor":"#070b11","stylingEdgeTextSize":12,"stylingEdgeTextAlign":"horizontal","stylingEdgeWidth":1,"stylingEdgeLength":250,"stylingEdgeCaptionProperty":"rdfsLabel"},"userDefinedEdgeStyling":{"stylingEdgeLineColor":"#070b11","stylingEdgeLineColorHover":"#070b11","stylingEdgeLineColorHighlight":"#9c27b0","stylingEdgeLineStyle":false,"stylingEdgeTextColor":"#070b11","stylingEdgeTextSize":12,"stylingEdgeTextAlign":"horizontal","stylingEdgeWidth":1,"stylingEdgeLength":250,"stylingEdgeCaptionProperty":"rdfsLabel"},"stylingEdgeByProperty":[{"filterType":"equal","filterValue":"Subclass of","styleType":"stylingEdgeLineStyle","styleValue":true,"property":"rdfsLabel"},{"filterType":"equal","filterValue":"","styleType":"","styleValue":""}]}'
    )
    expect(setSaved).toHaveBeenCalledWith(true)
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 5000
    )
  })
})
