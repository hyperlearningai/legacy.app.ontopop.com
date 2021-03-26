import highlightSelectedNode from '../../../utils/nodesSelection/highlightSelectedNode'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const focus = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  userDefinedNodeStyling: {
    stylingNodeHighlightBackgroundColor: '#ffff00',
  },
  globalNodeStyling: {
    stylingNodeHighlightBackgroundColor: '#ff0000',
  },
  network: {
    focus
  }
}))

const updateStoreValue = jest.fn()

describe('highlightSelectedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getNode.mockImplementationOnce(() => ({
      id: '123',
      color: {
        background: '#000'
      },
      userDefined: true
    }))

    await highlightSelectedNode({
      updateStoreValue,
      selectedNode: '123'
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['prevSelectedNode'],
      OPERATION_TYPE_UPDATE, {
        color: { background: '#ffff00' },
        userDefined: true,
        id: '123'
      }
    )

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        background: '#ffff00',
      },
      id: '123',
    })

    expect(focus).toHaveBeenCalledWith(
      '123', { animation: false, scale: 1 }
    )
  })
})
