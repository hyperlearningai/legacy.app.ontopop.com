import setShortestPath from '../../../utils/shortestPath/setShortestPath'
import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import { ROUTE_NETWORK_GRAPHS } from '../../../constants/routes'
import setPageView from '../../../utils/analytics/setPageView'

const updateStoreValue = jest.fn()
const pushState = jest.fn()
const shortestPathNode1 = '33'
const shortestPathNode2 = '40'
const lastGraphIndex = 1
let windowSpy

jest.mock('../../../utils/shortestPath/getShortestPath')
jest.mock('../../../utils/analytics/setPageView')

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
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    windowSpy.mockImplementation(() => ({
      history: {
        pushState
      }
    }))

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
      [
        [
          'sidebarView',
        ],
        'update',
        'networkGraphs',
      ],
    ])
    expect(pushState).toHaveBeenCalledWith('', '', ROUTE_NETWORK_GRAPHS)
    expect(setPageView).toHaveBeenCalledWith({ url: ROUTE_NETWORK_GRAPHS, updateStoreValue })
  })
})
