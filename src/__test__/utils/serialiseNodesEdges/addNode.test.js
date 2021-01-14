import { SELECTED_NODE_COLOR } from '../../../constants/graph'
import addNode from '../../../utils/serialiseNodesEdges/addNode'

describe('addNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const availableNodesNormalised = {}
    const availableNodes = []
    const addedNodes = []
    const highlightedNodes = []
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }

    await addNode({
      availableNodesNormalised,
      availableNodes,
      addedNodes,
      nodeId,
      nodeIdObject,
      highlightedNodes
    })

    expect(availableNodesNormalised).toEqual({
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
      },
    })
    expect(availableNodes).toEqual([
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'test',
      },
    ])
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })

  it('should change node background if in highlightedNodes', async () => {
    const availableNodesNormalised = {}
    const availableNodes = []
    const addedNodes = []
    const highlightedNodes = ['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M']
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }

    await addNode({
      availableNodesNormalised,
      availableNodes,
      addedNodes,
      nodeId,
      nodeIdObject,
      highlightedNodes
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
    expect(availableNodes).toEqual([
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
})
