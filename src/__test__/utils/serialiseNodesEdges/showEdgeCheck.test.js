import showEdgeCheck from '../../../utils/serialiseNodesEdges/showEdgeCheck'

describe('showEdgeCheck', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return false when to or from not in nodesIdsToDisplay', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'not-present'
    const addedEdges = []
    const edgeUniqueId = ''
    const edgeId = ''
    const from = ''
    const edgesIdsToDisplay = []

    expect(showEdgeCheck({
      addedEdges,
      edgeUniqueId,
      edgeId,
      from,
      to,
      edgesIdsToDisplay,
      nodesIdsToDisplay
    })).toEqual(false)
  })

  it('should return false when edgeId not in edgesIdsToDisplay', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const addedEdges = []
    const edgeUniqueId = ''
    const edgeId = 'not-present'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const edgesIdsToDisplay = ['http://webprotege.stanford.edu/edgeabc']

    expect(showEdgeCheck({
      addedEdges,
      edgeUniqueId,
      edgeId,
      from,
      to,
      edgesIdsToDisplay,
      nodesIdsToDisplay
    })).toEqual(false)
  })

  it('should return false when edgeUniqueId in addedEdges', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const addedEdges = ['http://unique-edge-id']
    const edgeUniqueId = 'http://unique-edge-id'
    const edgeId = 'not-present'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const edgesIdsToDisplay = ['http://webprotege.stanford.edu/edgeabc']

    expect(showEdgeCheck({
      addedEdges,
      edgeUniqueId,
      edgeId,
      from,
      to,
      edgesIdsToDisplay,
      nodesIdsToDisplay
    })).toEqual(false)
  })

  it('should return true when edgeUniqueId in addedEdges', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const addedEdges = ['http://unique-edge-id']
    const edgeUniqueId = 'http://unique-edge-id-not-present'
    const edgeId = 'http://webprotege.stanford.edu/edgeabc'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const edgesIdsToDisplay = ['http://webprotege.stanford.edu/edgeabc']

    expect(showEdgeCheck({
      addedEdges,
      edgeUniqueId,
      edgeId,
      from,
      to,
      edgesIdsToDisplay,
      nodesIdsToDisplay
    })).toEqual(true)
  })
})
