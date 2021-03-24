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
    const node = { id: '12', userDefined: false }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesSpiderability: {
        12: 'false'
      },
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
        id: '12',
      }
    )
  })

  it('should work correctly when hidden', async () => {
    const node = { id: '12', userDefined: false }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesSpiderability: {
        12: 'hidden'
      }
    }))

    await highlightSpiderableNode({
      node
    })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 2,
        color: {
          border: '#9c27b0',
        },
        id: '12',
      }
    )
  })

  it('should work correctly when spiderable', async () => {
    const node = { id: '12', userDefined: false }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      nodesSpiderability: {
        12: 'true'
      }
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
        id: '12',
      }
    )
  })
})
