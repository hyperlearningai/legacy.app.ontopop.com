import setNodeOverlay from '../../../utils/graphVisualisation/setNodeOverlay'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const setStoreState = jest.fn()

describe('setNodeOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      shortestPathNodes: ['node-123', 'node-234'],
      isNodeOverlay: false,
      stylingNodeOverlayOpacity: 0.1
    }))

    getNode.mockImplementationOnce(() => ([{
      id: 'node-123',
    }]))

    await setNodeOverlay({
      setStoreState
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when no overlay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      shortestPathNodes: ['node-123', 'node-234'],
      isNodeOverlay: true,
      stylingNodeOverlayOpacity: 0.1
    }))

    getNode.mockImplementationOnce(() => ([{
      id: 'node-123',
    }]))

    await setNodeOverlay({
      setStoreState
    })

    expect(updateNodes).toHaveBeenCalledWith(
      { id: 'node-123', opacity: 0.1 }
    )
  })
})
