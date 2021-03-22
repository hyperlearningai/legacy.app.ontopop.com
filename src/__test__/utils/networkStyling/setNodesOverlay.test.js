import setNodesOverlay from '../../../utils/networkStyling/setNodesOverlay'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const setStoreState = jest.fn()

const commonState = {
  globalNodeStyling: {
    stylingNodeOverlayOpacity: 0.1
  },
  userDefinedNodeStyling: {
    stylingNodeOverlayOpacity: 0.1
  }
}

describe('setNodesOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      shortestPathNodes: ['node-123', 'node-234'],
      isNodeOverlay: false,
    }))

    getNode.mockImplementationOnce(() => ([{
      id: 'node-123',
    }]))

    await setNodesOverlay({
      setStoreState
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when no overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      shortestPathNodes: ['node-123', 'node-234'],
      isNodeOverlay: true,
    }))

    getNode.mockImplementationOnce(() => ([{
      id: 'node-123',
    }]))

    await setNodesOverlay({
      setStoreState
    })

    expect(updateNodes).toHaveBeenCalledWith(
      { id: 'node-123', opacity: 0.1 }
    )
  })
})
