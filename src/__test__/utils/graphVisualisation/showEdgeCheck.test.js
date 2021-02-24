import showEdgeCheck from '../../../utils/graphVisualisation/showEdgeCheck'

describe('showEdgeCheck', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return false when to or from not in nodesIdsToDisplay', async () => {
    const nodesIdsToDisplay = [
      '21',
      '33',
      '40'
    ]

    const edge = {
      from: '111',
      to: '21'
    }

    expect(showEdgeCheck({
      edge,
      nodesIdsToDisplay,
    })).toEqual(false)
  })

  it('should return true ', async () => {
    const nodesIdsToDisplay = [
      '21',
      '33',
      '40'
    ]

    const edge = {
      from: '21',
      to: '33'
    }

    expect(showEdgeCheck({
      edge,
      nodesIdsToDisplay,
    })).toEqual(true)
  })
})
