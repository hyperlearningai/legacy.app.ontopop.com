import setHighlightedNode from '../../../utils/networkStyling/setHighlightedNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

describe('setHighlightedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no highlighted nodes', async () => {
    const nodeId = 'node-123'

    getNode.mockImplementationOnce(() => ([{
      id: nodeId
    }]))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      highlightedNodes: [],
      stylingNodeHighlightBackgroundColor: '#000'
    }))

    await setHighlightedNode({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly if not highlighted', async () => {
    const nodeId = 'node-123'

    getNode.mockImplementationOnce(() => ([{
      id: nodeId
    }]))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      highlightedNodes: ['node-234'],
      stylingNodeHighlightBackgroundColor: '#000'
    }))

    await setHighlightedNode({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    const nodeId = 'node-123'

    getNode.mockImplementationOnce(() => ([{
      id: nodeId
    }]))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      highlightedNodes: [nodeId],
      stylingNodeHighlightBackgroundColor: '#000'
    }))

    await setHighlightedNode({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        background: '#000',
      },
      id: nodeId,
    })
  })
})
