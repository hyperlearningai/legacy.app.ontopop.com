import appendNode from '../../../utils/serialiseNodesEdges/appendNode'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const circleMax = 1
const padding = 1
const angle = 1

describe('addNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const addedNodes = []
    const highlightedNodes = []
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }
    const isNodeOverlay = false
    const shortestPathNodes = []

    getNode.mockImplementationOnce(() => null)
    store.getState = jest.fn().mockImplementationOnce(() => ({
      isNodeOverlay,
      highlightedNodes,
    }))

    await appendNode({
      addedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes,
      circleMax,
      padding,
      angle
    })

    expect(addNode.mock.calls[0][0].id).toEqual('http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M')
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if in highlightedNodes', async () => {
    const addedNodes = []
    const highlightedNodes = ['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M']
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }
    const isNodeOverlay = false
    const shortestPathNodes = []

    getNode.mockImplementationOnce(() => null)
    store.getState = jest.fn().mockImplementationOnce(() => ({
      isNodeOverlay,
      highlightedNodes,
    }))

    await appendNode({
      addedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes,
      circleMax,
      padding,
      angle
    })

    expect(addNode.mock.calls[0][0].id).toEqual('http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M')
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if isNodeOverlay and nodeid not in shortestPathNodes', async () => {
    const addedNodes = []
    const highlightedNodes = []
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }
    const isNodeOverlay = true
    const shortestPathNodes = ['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZ1234']

    getNode.mockImplementationOnce(() => null)
    store.getState = jest.fn().mockImplementationOnce(() => ({
      isNodeOverlay,
      highlightedNodes,
    }))

    await appendNode({
      addedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes,
      circleMax,
      padding,
      angle
    })

    expect(addNode.mock.calls[0][0].id).toEqual('http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M')
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })
})
