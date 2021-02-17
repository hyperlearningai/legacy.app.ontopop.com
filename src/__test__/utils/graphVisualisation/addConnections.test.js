import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import addConnections from '../../../utils/graphVisualisation/addConnections'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('addConnections', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const addedEdges = []
    const id = 'pred_from_to'
    const from = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const to = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const predicate = 'http://webprotege.stanford.edu/abc'
    const edge = {
      predicate: id,
      from,
      to
    }
    const edgesConnections = {}
    const edgeConnection = {
      ...edge
    }
    const nodesConnections = {}

    await addConnections({
      addedEdges,
      id,
      edge,
      edgesConnections,
      edgeConnection,
      from,
      nodesConnections,
      predicate,
      to,
    })

    expect(addEdge).toHaveBeenCalledWith(edge)
    expect(edgesConnections).toEqual({
      'http://webprotege.stanford.edu/abc': [{
        ...edge
      }]
    })
    expect(nodesConnections).toEqual({
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
        {
          from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          predicate: 'http://webprotege.stanford.edu/abc',
          to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
        },
      ],
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': [
        {
          from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          predicate: 'http://webprotege.stanford.edu/abc',
          to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
        },
      ],
    })
  })
})
