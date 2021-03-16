import setHighlightedNode from '../../../utils/networkStyling/setHighlightedNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const node = { id: '123' }
getNode.mockImplementation(() => ([node]))

const commonState = {
  globalNodeStyling: { stylingNodeHighlightBackgroundColor: '#000' },
  userDefinedNodeStyling: { stylingNodeHighlightBackgroundColor: '#000' },
}

describe('setHighlightedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no highlighted nodes', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      highlightedNodes: [],
      ...commonState
    }))

    await setHighlightedNode({
      node
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly if not highlighted', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      highlightedNodes: ['node-234'],
      ...commonState
    }))

    await setHighlightedNode({
      node
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      highlightedNodes: [node.id],
      ...commonState
    }))

    await setHighlightedNode({
      node
    })

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        background: '#000',
      },
      id: node.id,
    })
  })
})
