import addExpandedNode from '../../../utils/graphVisualisation/addExpandedNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'
import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setEdgeStyle')
jest.mock('../../../utils/graphVisualisation/actionAfterNodesAdded')

const setStoreState = jest.fn()
const addNumber = jest.fn()

getNode.mockImplementation(() => null)

describe('addExpandedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '1'
    const edge = {
      id: '111',
      to: '12',
      from: '33'
    }
    await addExpandedNode({
      nodeId,
      index: 10,
      edgesNumber: 11,
      edge,
      nodesEdges: { 111: [] },
      setStoreState,
      classesFromApi,
      globalNodeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel'
      },
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel'
      },
      addNumber,
    })

    expect(addNode).toHaveBeenCalledTimes(1)
    expect(setEdgeStyle).toHaveBeenLastCalledWith(
      { edge }
    )
    expect(setNodeStyle).toHaveBeenCalledTimes(1)

    expect(addEdge).toHaveBeenLastCalledWith(
      edge
    )

    expect(actionAfterNodesAdded).toHaveBeenCalledWith({
      setStoreState,
      addNumber,
      nodesEdges: {
        1: [
          '111',
        ],
        111: [],
        33: [
          '111',
        ]
      },
    })
  })
})
