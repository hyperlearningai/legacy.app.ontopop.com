/* eslint max-len:0 */
import highlightCommentedNodes from '../../../utils/networkStyling/highlightCommentedNodes'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

getNodeIds.mockImplementation(() => [
  '12',
  '33'
])

getNode.mockImplementation((id) => (
  {
    id
  }
))

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

describe('highlightCommentedNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodesNotes = [{
      nodeId: 12,
    }, {
      nodeId: 44,
    }]

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesNotes,
    }))

    await highlightCommentedNodes()

    expect(updateNodes.mock.calls).toEqual([
      [
        {
          borderWidth: 5,
          color: {
            border: '#2196f3',
          },
          id: '12',
        },
      ],
      [
        {
          borderWidth: 5,
          color: {
            border: '#2196f3',
          },
          id: '44',
        },
      ],
    ])
  })
})
