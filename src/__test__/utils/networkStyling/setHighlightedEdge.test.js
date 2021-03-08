import setHighlightedEdge from '../../../utils/networkStyling/setHighlightedEdge'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

const edge = { id: '123' }

const commonState = {
  globalEdgeStyling: { stylingEdgeLineColorHighlight: '#000' },
  userDefinedEdgeStyling: { stylingEdgeLineColorHighlight: '#000' },
}

describe('setHighlightedEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no highlighted nodes', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      highlightedEdges: [],
      ...commonState
    }))

    await setHighlightedEdge({
      edge
    })

    expect(updateEdges).toHaveBeenCalledTimes(0)
  })

  it('should work correctly if not highlighted', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      highlightedEdges: ['234'],
      ...commonState
    }))

    await setHighlightedEdge({
      edge
    })

    expect(updateEdges).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      highlightedEdges: [edge.id],
      ...commonState
    }))

    await setHighlightedEdge({
      edge
    })

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        color: '#000',
      },
      id: edge.id,
    })
  })
})
