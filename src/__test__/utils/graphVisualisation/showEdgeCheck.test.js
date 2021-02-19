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
    const predicate = ''
    const from = ''
    const edgesIdsToDisplay = []

    expect(showEdgeCheck({
      predicate,
      edgesIdsToDisplay,
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
    const predicate = ''
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const edgesIdsToDisplay = [
      'http://webprotege.stanford.edu/edgeabc'
    ]

    expect(showEdgeCheck({
      predicate,
      edgesIdsToDisplay,
      from,
      nodesIdsToDisplay,
      to,
    })).toEqual(false)
  })

  it('should return true ', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
    ]

    const to = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const from = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const predicate = 'http://webprotege.stanford.edu/edgeabc'
    const edgesIdsToDisplay = ['http://webprotege.stanford.edu/edgeabc']

    expect(showEdgeCheck({
      predicate,
      edgesIdsToDisplay,
      from,
      nodesIdsToDisplay,
      to,
    })).toEqual(true)
  })
})
