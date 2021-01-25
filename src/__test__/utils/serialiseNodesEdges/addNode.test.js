import { SELECTED_NODE_COLOR } from '../../../constants/graph'
import addNode from '../../../utils/serialiseNodesEdges/addNode'

describe('addNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const availableNodesNormalised = {}
    const availableNodesList = []
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
      availableNodesList,
      availableNodesNormalised,
      isNodeOverlay,
      highlightedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes
    })

    expect(availableNodesNormalised).toEqual({
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
      },
    })
    expect(availableNodesList).toEqual([
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
      },
    ])
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if in highlightedNodes', async () => {
    const availableNodesNormalised = {}
    const availableNodesList = []
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
      availableNodesList,
      availableNodesNormalised,
      isNodeOverlay,
      highlightedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes
    })

    expect(availableNodesNormalised).toEqual({
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        color: {
          background: SELECTED_NODE_COLOR
        }
      },
    })
    expect(availableNodesList).toEqual([
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        color: {
          background: SELECTED_NODE_COLOR
        }
      },
    ])
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if isNodeOverlay and nodeid not in shortestPathNodes', async () => {
    const availableNodesNormalised = {}
    const availableNodesList = []
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
      availableNodesList,
      availableNodesNormalised,
      isNodeOverlay,
      highlightedNodes,
      nodeId,
      nodeIdObject,
      shortestPathNodes
    })

    expect(availableNodesNormalised).toEqual({
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        opacity: 0.1,
      },
    })
    expect(availableNodesList).toEqual([
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
        opacity: 0.1,
      },
    ])
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })
})
