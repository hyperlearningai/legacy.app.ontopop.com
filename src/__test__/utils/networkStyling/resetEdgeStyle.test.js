import resetEdgeStyle from '../../../utils/networkStyling/resetEdgeStyle'
import store from '../../../store'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

describe('resetEdgeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi,
      globalEdgeStyling: {
        stylingEdgeLineColor: '#000',
        stylingEdgeLineColorHighlight: '#000',
        stylingEdgeLineColorHover: '#000',
        stylingEdgeTextColor: '#000',
        stylingEdgeTextSize: 12,
        stylingEdgeTextAlign: 'horizontal',
        stylingEdgeWidth: 3,
        stylingEdgeLineStyle: true
      }
    }))

    const edge = {
      id: '111'
    }

    await resetEdgeStyle({
      edge
    })

    expect(updateEdges).toHaveBeenCalledWith(
      {
        arrows: {
          to: true,
        },
        color: {
          color: '#000',
          highlight: '#000',
          hover: '#000',
          inherit: 'from',
          opacity: 1,
        },
        dashes: true,
        font: {
          align: 'horizontal',
          color: '#000',
          size: 12,
        },
        id: '111',
        label: '',
        labelHighlightBold: true,
        selectionWidth: 3,
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier',
        },
        width: 3,
      }
    )
  })
})
