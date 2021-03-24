import addExpandedNode from '../../../utils/graphVisualisation/addExpandedNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'
import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import store from '../../../store'
import getElementLabel from '../../../utils/networkStyling/getElementLabel'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setEdgeStyle')
jest.mock('../../../utils/graphVisualisation/actionAfterNodesAdded')
jest.mock('../../../utils/networkStyling/getElementLabel')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')

const updateStoreValue = jest.fn()

getNode.mockImplementation(() => null)
getElementLabel.mockImplementation(() => 'Road')

store.getState = jest.fn().mockImplementation(() => ({
  globalNodeStyling: {
    stylingNodeCaptionProperty: 'rdfsLabel'
  },
  userDefinedNodeStyling: {
    stylingNodeCaptionProperty: 'rdfsLabel'
  },
  nodesEdges: { 111: [] },
}))

describe('addExpandedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when edge not visible', async () => {
    const nodeId = '1'
    const edge = {
      id: '111',
      to: '12',
      from: '33'
    }

    checkEdgeVisibility.mockImplementation(() => false)
    checkNodeVisibility.mockImplementation(() => true)

    await addExpandedNode({
      nodeId,
      index: 10,
      edgesNumber: 11,
      edge,
      updateStoreValue,
      classesFromApi,
    })

    expect(addNode).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when node not visible', async () => {
    const nodeId = '1'
    const edge = {
      id: '111',
      to: '12',
      from: '33'
    }

    checkEdgeVisibility.mockImplementation(() => true)
    checkNodeVisibility.mockImplementation(() => false)

    await addExpandedNode({
      nodeId,
      index: 10,
      edgesNumber: 11,
      edge,
      updateStoreValue,
      classesFromApi,
    })

    expect(addNode).toHaveBeenCalledTimes(0)
    expect(addEdge).toHaveBeenLastCalledWith(
      {
        edge,
        updateStoreValue
      }
    )
    expect(setEdgeStyle).toHaveBeenLastCalledWith(
      { edge }
    )
    expect(actionAfterNodesAdded).toHaveBeenCalledWith({
      updateStoreValue,
    })
  })

  it('should work correctly', async () => {
    checkEdgeVisibility.mockImplementation(() => true)
    checkNodeVisibility.mockImplementation(() => true)

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
      updateStoreValue,
      classesFromApi
    })

    expect(addNode).toHaveBeenCalledTimes(1)
    expect(setEdgeStyle).toHaveBeenLastCalledWith(
      { edge }
    )
    expect(setNodeStyle).toHaveBeenCalledTimes(1)

    expect(addEdge).toHaveBeenLastCalledWith(
      {
        edge,
        updateStoreValue
      }
    )

    expect(actionAfterNodesAdded).toHaveBeenCalledWith({
      updateStoreValue,
    })
  })
})
