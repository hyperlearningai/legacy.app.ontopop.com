import setUserDefinedEdgeStyle from '../../../utils/networkStyling/setUserDefinedEdgeStyle'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  LABEL_PROPERTY,
  NODE_BORDER,
  NODE_TEXT_COLOR
} from '../../../constants/graph'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

describe('setUserDefinedEdgeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should work correctly when node not userDefined', async () => {
    const edge = {
      id: '12',
      rdfsLabel: 'linked to',
    }

    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi,
      userDefinedEdgeStyling: {
        stylingEdgeTextSize: 25,
        stylingEdgeWidth: 1,
        stylingEdgeTextAlign: 'center',
        stylingEdgeTextColor: NODE_TEXT_COLOR,
        stylingEdgeWidthSelected: 2,
        stylingEdgeWidthColor: NODE_BORDER,
        stylingEdgeLineColorHover: HIGHLIGHT_NODE_BORDER,
        stylingEdgeLineColorHighlight: CLICK_NODE_BACKGROUND,
        stylingEdgeLineColor: HOVER_NODE_BACKGROUND,
        stylingEdgeLineStyle: 'center',
        stylingEdgeCaptionProperty: LABEL_PROPERTY,
      }
    }))

    await setUserDefinedEdgeStyle({
      edge
    })

    expect(updateEdges).toHaveBeenCalledWith(
      {
        arrows: {
          to: true,
        },
        color: {
          color: '#f2f2f2',
          highlight: '#ffed00',
          hover: '#009688',
          inherit: 'from',
          opacity: 1,
        },
        dashes: 'center',
        font: {
          align: 'center',
          color: '#000000',
          size: 25,
        },
        id: '12',
        label: 'Subclass\nof',
        labelHighlightBold: true,
        rdfsLabel: 'linked to',
        selectionWidth: 3,
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier',
        },
        width: 1,
      }
    )
  })

  it('should work correctly', async () => {
    const edge = {
      id: '12',
      rdfsLabel: 'linked to',
    }

    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi,
      userDefinedEdgeStyling: {
        stylingEdgeTextSize: 25,
        stylingEdgeWidth: 1,
        stylingEdgeTextColor: NODE_TEXT_COLOR,
        stylingEdgeWidthSelected: 2,
        stylingEdgeWidthColor: NODE_BORDER,
        stylingEdgeLineColorHover: HIGHLIGHT_NODE_BORDER,
        stylingEdgeLineColorHighlight: CLICK_NODE_BACKGROUND,
        stylingEdgeLineColor: HOVER_NODE_BACKGROUND,
        stylingEdgeLineStyle: 'center',
        stylingEdgeCaptionProperty: LABEL_PROPERTY,
      }
    }))

    await setUserDefinedEdgeStyle({
      edge
    })

    expect(updateEdges).toHaveBeenCalledWith(
      {
        arrows: {
          to: true,
        },
        color: {
          color: '#f2f2f2',
          highlight: '#ffed00',
          hover: '#009688',
          inherit: 'from',
          opacity: 1,
        },
        dashes: 'center',
        font: {
          align: undefined,
          color: '#000000',
          size: 25,
        },
        id: '12',
        label: 'Subclass\nof',
        labelHighlightBold: true,
        rdfsLabel: 'linked to',
        selectionWidth: 3,
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier',
        },
        width: 1,
      },
    )
  })
})
