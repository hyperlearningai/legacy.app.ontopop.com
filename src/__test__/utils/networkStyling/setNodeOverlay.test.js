import setNodeOverlay from '../../../utils/networkStyling/setNodeOverlay'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('setNodeOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      shortestPathNodes: ['123', '234'],
      isNodeOverlay: false,
      globalNodeStyling: { stylingNodeOverlayOpacity: 0.1 }
    }))

    const nodeId = '123'

    await setNodeOverlay({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when node in shortest path overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      shortestPathNodes: ['123', '234'],
      isNodeOverlay: true,
      globalNodeStyling: { stylingNodeOverlayOpacity: 0.1 }
    }))

    const nodeId = '123'
    await setNodeOverlay({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      shortestPathNodes: ['123', '234'],
      isNodeOverlay: true,
      globalNodeStyling: { stylingNodeOverlayOpacity: 0.1 }
    }))

    const nodeId = '345'

    await setNodeOverlay({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledWith(
      { id: '345', opacity: 0.1 }
    )
  })
})
