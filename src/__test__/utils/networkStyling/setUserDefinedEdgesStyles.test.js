import setUserDefinedEdgesStyles from '../../../utils/networkStyling/setUserDefinedEdgesStyles'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { EDGE_COLOR, EDGE_COLOR_HIGHLIGHTED, EDGE_LABEL_PROPERTY } from '../../../constants/graph'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

describe('setUserDefinedEdgesStyles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '12'

    getEdge.mockImplementationOnce(() => ([{
      id: '111',
      rdfsLabel: 'applies to'
    },
    {
      id: '12',
      rdfsLabel: 'linked to'
    }]))

    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi,
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
        stylingEdgeCaptionProperty: EDGE_LABEL_PROPERTY,
      }
    }))

    await setUserDefinedEdgesStyles({
      nodeId
    })

    expect(updateEdges.mock.calls).toEqual(
      [
        [
          {
            arrows: {
              to: true,
            },
            color: {
              color: '#070b11',
              highlight: '#9c27b0',
              hover: '#070b11',
              inherit: 'from',
              opacity: 1,
            },
            dashes: false,
            font: {
              align: 'horizontal',
              color: '#070b11',
              size: 12,
            },
            id: '111',
            label: 'Subclass\nof',
            labelHighlightBold: true,
            rdfsLabel: 'applies to',
            selectionWidth: 3,
            smooth: {
              forceDirection: 'none',
              roundness: 0.45,
              type: 'cubicBezier',
            },
            width: 1,
          },
        ],
        [
          {
            arrows: {
              to: true,
            },
            color: {
              color: '#070b11',
              highlight: '#9c27b0',
              hover: '#070b11',
              inherit: 'from',
              opacity: 1,
            },
            dashes: false,
            font: {
              align: 'horizontal',
              color: '#070b11',
              size: 12,
            },
            id: '12',
            label: 'Provided\nto',
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
        ],
      ]
    )
  })
})
