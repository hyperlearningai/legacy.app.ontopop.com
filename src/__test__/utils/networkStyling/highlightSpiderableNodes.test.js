/* eslint max-len:0 */
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
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
  totalEdgesPerNode,
  globalNodeStyling: {
    stylingNodeBorderColor: '#000',
    stylingNodeBorder: 1,
  },
  userDefinedNodeStyling: {
    stylingNodeBorderColor: '#000',
    stylingNodeBorder: 1,
  },
}

describe('highlightSpiderableNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodesEdges = {
      12: totalEdgesPerNode['12'].slice(0, 1)
    }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesEdges,
    }))

    await highlightSpiderableNodes()

    expect(updateNodes.mock.calls).toEqual([
      [
        {
          borderWidth: 2,
          color: {
            border: '#ff6f61',
          },
          id: '12',
        },
      ],
      [
        {
          borderWidth: 1,
          color: {
            border: '#000',
          },
          id: '33',
        },
      ],
    ])
  })
})
