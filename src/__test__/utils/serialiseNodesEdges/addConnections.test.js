import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import addConnections from '../../../utils/serialiseNodesEdges/addConnections'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('addConnections', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const addedEdges = []
    const edgeUniqueId = 'pred_from_to'
    const from = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const to = 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
    const predicate = 'http://webprotege.stanford.edu/abc'
    const edge = {
      id: edgeUniqueId,
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
      edgeUniqueId,
      edge,
      edgesConnections,
      edgeConnection,
      predicate,
      from,
      to,
      nodesConnections
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
          id: 'pred_from_to',
          to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
        }
      ],
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': [
        {
          from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          id: 'pred_from_to',
          to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
        }
      ]
    })
  })
})
