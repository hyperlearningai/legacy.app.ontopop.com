import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import addConnections from '../../../utils/graphVisualisation/addConnections'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('addConnections', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const addedEdges = []
    const id = '151'
    const from = '12'
    const to = '24'
    const predicate = '151'
    const edge = {
      predicate: id,
      from,
      to
    }
    const edgeConnection = {
      ...edge
    }
    const nodesConnections = {}

    await addConnections({
      addedEdges,
      id,
      edge,
      edgeConnection,
      from,
      nodesConnections,
      predicate,
      to,
    })

    expect(addEdge).toHaveBeenCalledWith(edge)
    expect(nodesConnections).toEqual({
      12: [
        '151',
      ],
      24: [
        '151',
      ],
    })
  })
})
