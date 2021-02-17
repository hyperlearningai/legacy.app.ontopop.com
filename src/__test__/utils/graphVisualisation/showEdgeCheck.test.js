import showEdgeCheck from '../../../utils/graphVisualisation/showEdgeCheck'

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

    const to = 'present'
    const addedEdges = []
    const predicate = ''
    const id = ''
    const from = ''
    const edgesIdsToDisplay = []

    expect(showEdgeCheck({
      addedEdges,
      predicate,
      edgesIdsToDisplay,
      id,
      from,
      nodesIdsToDisplay,
      to,
    })).toEqual(false)
  })

  it('should return false when id not in edgesIdsToDisplay', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const addedEdges = []
    const predicate = ''
    const id = 'not-present'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const edgesIdsToDisplay = [
      'http://webprotege.stanford.edu/edgeabc'
    ]

    expect(showEdgeCheck({
      addedEdges,
      predicate,
      edgesIdsToDisplay,
      id,
      from,
      nodesIdsToDisplay,
      to,
    })).toEqual(false)
  })

  it('should return false when predicate in addedEdges', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const predicate = 'http://unique-edge-id'
    const id = `${predicate}___${from}___${to}`
    const addedEdges = ['http://unique-edge-id']
    const edgesIdsToDisplay = ['http://webprotege.stanford.edu/edgeabc']

    expect(showEdgeCheck({
      addedEdges,
      predicate,
      edgesIdsToDisplay,
      id,
      from,
      nodesIdsToDisplay,
      to,
    })).toEqual(false)
  })

  it('should return true when predicate not in addedEdges', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const predicate = 'http://webprotege.stanford.edu/edgeabc'
    const id = `${predicate}___${from}___${to}`
    const addedEdges = ['http://olde-dge']
    const edgesIdsToDisplay = ['http://webprotege.stanford.edu/edgeabc']

    expect(showEdgeCheck({
      addedEdges,
      predicate,
      edgesIdsToDisplay,
      id,
      from,
      nodesIdsToDisplay,
      to,
    })).toEqual(true)
  })
})
