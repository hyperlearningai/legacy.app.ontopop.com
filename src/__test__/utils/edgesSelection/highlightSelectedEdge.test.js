import highlightSelectedEdge from '../../../utils/edgesSelection/highlightSelectedEdge'
import store from '../../../store'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

const focus = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  userDefinedEdgeStyling: {
    stylingEdgeLineColorHighlight: '#ffff00'
  },
  globalEdgeStyling: {
    stylingEdgeLineColorHighlight: '#ff0000'
  },
  network: { focus }
}))

const setStoreState = jest.fn()

describe('highlightSelectedEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdge.mockImplementationOnce(() => ({
      id: '123',
      from: '40',
      color: {
        color: '#000'
      },
      userDefined: true
    }))

    await highlightSelectedEdge({
      setStoreState,
      selectedEdge: '123'
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'prevSelectedEdge', {
        color: {
          color: '#ffff00'
        },
        id: '123',
        userDefined: true,
        from: '40',
      }
    )

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        color: '#ffff00',
      },
      id: '123',
      width: 3,
    })

    expect(focus).toHaveBeenCalledWith(
      '40',
      {
        scale: 1,
        animation: false
      }
    )
  })
})
