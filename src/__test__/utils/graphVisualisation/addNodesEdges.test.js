import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import addNodesEdges from '../../../utils/graphVisualisation/addNodesEdges'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/networkStyling/setEdgeStyle')

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
    expect(setEdgeStyle).toHaveBeenCalledWith({ edge })

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
