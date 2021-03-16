import setHighlightedEdges from '../../../utils/networkStyling/setHighlightedEdges'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

describe('setHighlightedEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdge.mockImplementationOnce(() => ([{
      id: '123'
    }]))

    store.getState = jest.fn().mockImplementation(() => ({
      highlightedEdges: ['123'],
      globalEdgeStyling: { stylingEdgeLineColorHighlight: '#000' },
      userDefinedEdgeStyling: { stylingEdgeLineColorHighlight: '#000' },
    }))

    await setHighlightedEdges()

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        color: '#000',
      },
      id: '123',
    })
  })
})
