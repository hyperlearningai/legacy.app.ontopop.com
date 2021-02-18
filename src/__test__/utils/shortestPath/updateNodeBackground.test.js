import updateNodeBackground from '../../../utils/shortestPath/updateNodeBackground'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

const background = '#000'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('updateNodeBackground', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no node', async () => {
    const nodeId = ''
    const originalNode = undefined
    const restore = false

    await updateNodeBackground({
      background,
      nodeId,
      originalNode,
      restore,
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    const nodeId = 'node-123'
    const originalNode = { id: 'node-123' }
    const restore = false

    await updateNodeBackground({
      background,
      nodeId,
      originalNode,
      restore,
    })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        color: { background: '#000' },
        id: 'node-123'
      }
    )
  })
})
