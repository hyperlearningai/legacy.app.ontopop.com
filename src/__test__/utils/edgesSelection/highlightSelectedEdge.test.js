import highlightSelectedEdge from '../../../utils/edgesSelection/highlightSelectedEdge'
import store from '../../../store'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

store.getState = jest.fn().mockImplementation(() => ({
  stylingEdgeLineColorHighlight: '#ffff00'
}))

const setStoreState = jest.fn()

describe('highlightSelectedEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdge.mockImplementationOnce(() => ([{
      id: 'edge-123',
      color: {
        color: '#000'
      }
    }]))

    await highlightSelectedEdge({
      setStoreState,
      selectedEdge: 'edge-123'
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'prevSelectedEdges', [{
        color: {
          color: '#ffff00'
        },
        id: 'edge-123'
      }]
    )

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        color: '#ffff00',
      },
      id: 'edge-123',
      width: 3,
    })
  })
})
