import setShortestPathNode from '../../../utils/shortestPath/setShortestPathNode'
import store from '../../../store'
import updateNodeBackground from '../../../utils/shortestPath/updateNodeBackground'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.mock('../../../utils/shortestPath/updateNodeBackground')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const updateStoreValue = jest.fn()
const shortestPathNode1 = 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV'
const shortestPathNode2 = 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
const stylingNodeBackgroundColor = '#000'
const stylingNodeHighlightBackgroundColor = '#000'
const shortestPathNode1Object = { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }
const shortestPathNode2Object = { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }
const originalNode = { id: 'node-123' }

store.getState = jest.fn().mockImplementation(() => ({
  shortestPathNode1,
  shortestPathNode1Object,
  shortestPathNode2,
  shortestPathNode2Object,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBackgroundColor
}))

describe('setShortestPathNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when shortestPathNode1 and shortestPathNode2 === nodeId', async () => {
    const state = 'shortestPathNode1'
    const nodeId = shortestPathNode2

    await setShortestPathNode({
      state,
      updateStoreValue,
      nodeId,
    })

    expect(updateNodeBackground).toHaveBeenCalledTimes(0)
    expect(updateStoreValue).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when shortestPathNode1', async () => {
    const state = 'shortestPathNode1'
    const nodeId = 'node-123'
    getNode.mockImplementationOnce(() => (originalNode))

    await setShortestPathNode({
      state,
      updateStoreValue,
      nodeId,
    })

    expect(updateNodeBackground.mock.calls).toEqual([
      [
        {
          background: '#000',
          nodeId: 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
          originalNode: {
            id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
          },
          restore: true,
        },
      ],
      [
        {
          background: '#000',
          nodeId: 'node-123',
          originalNode: {
            id: 'node-123',
          },
        },
      ],
    ])

    expect(updateStoreValue.mock.calls).toEqual([
      [
        [
          'shortestPathNode1Object',
        ],
        OPERATION_TYPE_UPDATE,
        {
          id: 'node-123',
        },
      ],
      [
        [
          'shortestPathNode1',
        ],
        OPERATION_TYPE_UPDATE,
        'node-123',
      ],
    ])
  })

  it('should work correctly when shortestPathNode2', async () => {
    const state = 'shortestPathNode1'
    const nodeId = 'node-123'
    getNode.mockImplementationOnce(() => (originalNode))

    await setShortestPathNode({
      state,
      updateStoreValue,
      nodeId,
    })

    expect(updateNodeBackground.mock.calls).toEqual([
      [
        {
          background: '#000',
          nodeId: 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
          originalNode: {
            id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
          },
          restore: true,
        },
      ],
      [
        {
          background: '#000',
          nodeId: 'node-123',
          originalNode: {
            id: 'node-123',
          },
        },
      ],
    ])

    expect(updateStoreValue.mock.calls).toEqual([
      [
        [
          'shortestPathNode1Object',
        ],
        OPERATION_TYPE_UPDATE,
        {
          id: 'node-123',
        },
      ],
      [
        [
          'shortestPathNode1',
        ],
        OPERATION_TYPE_UPDATE,
        'node-123',
      ],
    ])
  })
})
