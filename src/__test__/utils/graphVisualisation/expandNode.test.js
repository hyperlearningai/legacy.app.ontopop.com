import expandNode from '../../../utils/graphVisualisation/expandNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import store from '../../../store'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../../constants/store'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import addNodeToGraph from '../../../utils/graphVisualisation/addNodeToGraph'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/graphVisualisation/addNodeToGraph')
jest.mock('../../../utils/networkStyling/setNodeStyle')

const updateStoreValue = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  totalEdgesPerNode,
  objectPropertiesFromApi,
  classesFromApi,
}))

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)
getNodeIds.mockImplementation(() => ['1', '177', '9'])
getEdgeIds.mockImplementation(() => ['11', '91'])
getEdge.mockImplementation(() => null)
getNode.mockImplementation(() => null)

jest.useFakeTimers()

describe('expandNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '1'

    await expandNode({
      nodeId,
      updateStoreValue,
    })

    expect(updateStoreValue.mock.calls).toEqual([
      [
        [
          'nodesSpiderability',
          '1',
        ],
        OPERATION_TYPE_UPDATE,
        'false',
      ],
      [['activeLoaders'], OPERATION_TYPE_ADD, 1]
    ])
    expect(setNodeStyle).toHaveBeenCalledWith(
      { node: classesFromApi[nodeId] }
    )
    expect(addNodeToGraph).toHaveBeenLastCalledWith(
      {
        existingEdges: ['11', '91'],
        isLast: true,
        isSpidered: true,
        nodeId: '192',
        updateStoreValue,
        visibleEdges: ['12', '441', '781', '811', '1421', '1781', '1855', '1921']
      }
    )
  })
})
