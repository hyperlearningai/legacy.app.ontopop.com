import setShortestPath from '../../../utils/shortestPath/setShortestPath'
import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import { ROUTE_NETWORK_GRAPHS } from '../../../constants/routes'

const updateStoreValue = jest.fn()
const shortestPathNode1 = '33'
const shortestPathNode2 = '40'
const lastGraphIndex = 1
const push = jest.fn()
const router = { push }

jest.mock('../../../utils/shortestPath/getShortestPath')

store.getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
  shortestPathNode1,
  shortestPathNode2,
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

describe('setShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const isNodeOverlay = false
    const nodesToExclude = []
    const edgesToExclude = []

    getShortestPath.mockImplementation(() => ([
      '33|||40'
    ]))
    await setShortestPath({
      isNodeOverlay,
      updateStoreValue,
      nodesToExclude,
      edgesToExclude,
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
          label: 'shortest-path-graph-2',
          options: {
            isNodeOverlay: false,
            shortestPathResults: [
              '33|||40',
            ],
            shortestPathSelectedNodes: [
              '33',
              '40',
            ],
          },
          type: 'shortest-path',
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
