import resetEdgesStyles from '../../../utils/networkStyling/resetEdgesStyles'
import store from '../../../store'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

describe('resetEdgesStyles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeLineColor: '#000',
      stylingEdgeLineColorHighlight: '#000',
      stylingEdgeLineColorHover: '#000',
      stylingEdgeTextColor: '#000',
      stylingEdgeTextSize: 12,
      stylingEdgeTextAlign: 'horizontal',
      stylingEdgeWidth: 3,
      stylingEdgeLineStyle: true
    }))

    getEdge.mockImplementationOnce(() => ([{
      id: 'edge-123'
    }]))

    await resetEdgesStyles()

    expect(updateEdges).toHaveBeenCalledWith(
      {
        color: {
          color: '#000',
          highlight: '#000',
          hover: '#000',
          inherit: 'from',
          opacity: 1
        },
        dashes: true,
        font: { align: 'horizontal', color: '#000', size: 12 },
        id: 'edge-123',
        labelHighlightBold: true,
        selectionWidth: 3,
        width: 3
      }
    )
  })
})
