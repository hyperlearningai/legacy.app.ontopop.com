import highlightSelectedNode from '../../../utils/nodesSelection/highlightSelectedNode'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

store.getState = jest.fn().mockImplementation(() => ({
  stylingNodeHighlightBackgroundColor: '#ffff00'
}))

const setStoreState = jest.fn()

describe('highlightSelectedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getNode.mockImplementationOnce(() => ({
      id: 'node-123',
      color: {
        background: '#000'
      }
    }))

    await highlightSelectedNode({
      setStoreState,
      selectedNode: 'node-123'
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'prevSelectedNode', { color: { background: '#ffff00' }, id: 'node-123' }
    )

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        background: '#ffff00',
      },
      id: 'node-123',
    })
  })
})
