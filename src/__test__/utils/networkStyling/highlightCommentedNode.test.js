/* eslint max-len:0 */
import highlightCommentedNode from '../../../utils/networkStyling/highlightCommentedNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

const commonState = {
  globalNodeStyling: {
    stylingNodeBorderColor: '#000',
    stylingNodeBorder: 1,
  },
  userDefinedNodeStyling: {
    stylingNodeBorderColor: '#000',
    stylingNodeBorder: 1,
  },
}

const node = {
  id: '12'
}

describe('highlightCommentedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly if no notes', async () => {
    const nodesNotes = [{
      nodeId: 10,
    }, {
      nodeId: 44,
    }]

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesNotes,
    }))

    await highlightCommentedNode({ node })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 1,
        color: {
          border: '#000',
        },
        id: '12',
      },
    )
  })

  it('should work correctly if notes', async () => {
    const nodesNotes = [{
      nodeId: 12,
    }, {
      nodeId: 44,
    }]

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesNotes,
    }))

    await highlightCommentedNode({ node })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 5,
        color: {
          border: '#2196f3',
        },
        id: '12',
      },
    )
  })
})
