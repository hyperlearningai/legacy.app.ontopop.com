import expandNode from '../../../utils/graphVisualisation/expandNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import store from '../../../store'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'
import { OPERATION_TYPE_ADD } from '../../../constants/store'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const updateStoreValue = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  totalEdgesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  nodesEdges: {},
  isPhysicsOn: false,
}))

countNodes.mockImplementation(() => 10)
countEdges.mockImplementation(() => 10)

jest.useFakeTimers()

describe('expandNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '1'

    getEdge.mockImplementation(() => null)
    getNode.mockImplementation(() => null)

    await expandNode({
      nodeId,
      updateStoreValue,
    })

    expect(updateStoreValue).toHaveBeenCalledWith(['activeLoaders'], OPERATION_TYPE_ADD, 1)

    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      1
    )
  })
})
