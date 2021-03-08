/* eslint max-len:0 */
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import highlightSpiderableNode from '../../../utils/networkStyling/highlightSpiderableNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

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

describe('highlightSpiderableNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when not spiderable', async () => {
    const node = { id: '11', userDefined: false }

    const nodesEdges = {
      11: totalEdgesPerNode['11']
    }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesEdges,
    }))

    await highlightSpiderableNode({
      node
    })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 1,
        color: {
          border: '#000',
        },
        id: '11',
      }
    )
  })

  it('should work correctly', async () => {
    const node = { id: '11', userDefined: false }

    const nodesEdges = {
      11: totalEdgesPerNode['11'].slice(0, 1)
    }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesEdges,
    }))

    await highlightSpiderableNode({
      node
    })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 2,
        color: {
          border: '#ff6f61',
        },
        id: '11',
      }
    )
  })
})
