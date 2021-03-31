import setNeighbourNodes from '../../../utils/nodeNeighbourhood/setNeighbourNodes'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import { ROUTE_NETWORK_GRAPHS } from '../../../constants/routes'

const updateStoreValue = jest.fn()
const selectedElement = { 1: 'node' }
const separationDegree = 1
const lastGraphIndex = 1
const push = jest.fn()
const router = { push }

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  selectedElement,
  lastGraphIndex,
  graphData: {
    'graph-0': {
      isUpperOntologyVisible: true,
      isSubClassEdgeVisible: true,
      isDatasetVisible: true,
      hiddenNodesProperties: [],
      hiddenEdgesProperties: []
    }
  },
  currentGraph: 'graph-0'
}))

describe('setNeighbourNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setNeighbourNodes({
      separationDegree,
      updateStoreValue,
      router
    })

    expect(updateStoreValue.mock.calls).toEqual([
      [
        [
          'graphData',
          'graph-2',
        ],
        OPERATION_TYPE_UPDATE,
        {
          hiddenEdgesProperties: [],
          hiddenNodesProperties: [],
          isDatasetVisible: true,
          isSubClassEdgeVisible: true,
          isUpperOntologyVisible: true,
          label: 'neighbourhood-graph-2',
          options: {
            selectedNodeId: '1',
            separationDegree: 1,
          },
          type: 'neighbourhood',
        },
      ],
      [
        [
          'currentGraph',
        ],
        OPERATION_TYPE_UPDATE,
        'graph-2',
      ],
      [
        [
          'lastGraphIndex',
        ],
        OPERATION_TYPE_UPDATE,
        2,
      ],
    ])
    expect(push).toHaveBeenCalledWith(ROUTE_NETWORK_GRAPHS)
  })
})
