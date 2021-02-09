import { SELECTED_NODE_COLOR } from '../../../constants/graph'
import addNode from '../../../utils/serialiseNodesEdges/addNode'

const add = jest.fn()

describe('addNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const availableNodes = {
      get: () => null,
      add
    }
    const addedNodes = []
    const highlightedNodes = []
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }
    const isNodeOverlay = false
    const shortestPathNodes = []

    await addNode({
      addedNodes,
      availableNodes,
      isNodeOverlay,
      highlightedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes
    })

    expect(add).toHaveBeenCalledWith(
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        x: NaN,
        y: NaN,
      },
    )
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if in highlightedNodes', async () => {
    const availableNodes = {
      get: () => null,
      add
    }
    const addedNodes = []
    const highlightedNodes = ['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M']
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }
    const isNodeOverlay = false
    const shortestPathNodes = []

    await addNode({
      addedNodes,
      availableNodes,
      isNodeOverlay,
      highlightedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes
    })

    expect(add).toHaveBeenCalledWith(
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        color: {
          background: SELECTED_NODE_COLOR
        },
        x: NaN,
        y: NaN,
      },
    )
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if isNodeOverlay and nodeid not in shortestPathNodes', async () => {
    const availableNodes = {
      get: () => null,
      add
    }
    const addedNodes = []
    const highlightedNodes = []
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }
    const isNodeOverlay = true
    const shortestPathNodes = ['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZ1234']

    await addNode({
      addedNodes,
      availableNodes,
      isNodeOverlay,
      highlightedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes
    })

    expect(add).toHaveBeenCalledWith(
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        opacity: 0.1,
        x: NaN,
        y: NaN,
      },
    )
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })
})
