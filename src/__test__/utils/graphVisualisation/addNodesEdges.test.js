import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import addNodesEdges from '../../../utils/graphVisualisation/addNodesEdges'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('addNodesEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const id = '151'
    const from = '12'
    const to = '24'
    const edge = {
      id,
      from,
      to
    }
    const nodesEdges = {
      [from]: [],
      [to]: [],
    }

    await addNodesEdges({
      edge,
      nodesEdges,
    })

    expect(addEdge).toHaveBeenCalledWith(edge)
    expect(nodesEdges).toEqual({
      12: [
        '151',
      ],
      24: [
        '151',
      ],
    })
  })
})
