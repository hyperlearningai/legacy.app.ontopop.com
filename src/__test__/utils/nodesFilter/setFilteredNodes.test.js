import setFilteredNodes from '../../../utils/nodesFilter/setFilteredNodes'
import store from '../../../store'
import setPageView from '../../../utils/analytics/setPageView'
import { ROUTE_NETWORK_GRAPHS } from '../../../constants/routes'

const updateStoreValue = jest.fn()
const pushState = jest.fn()
const lastGraphIndex = 1
let windowSpy

store.getState = jest.fn().mockImplementation(() => ({
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

jest.mock('../../../utils/analytics/setPageView')

describe('setFilteredNodes', () => {
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

    const nodesFilters = [{
      property: 'rdfsLabel',
      value: 'road'
    }]

    await setFilteredNodes({
      updateStoreValue,
      nodesFilters,
    })

    expect(updateStoreValue.mock.calls).toEqual([
      [
        [
          'graphData',
          'graph-2',
        ],
        'update',
        {
          hiddenEdgesProperties: [],
          hiddenNodesProperties: [],
          isDatasetVisible: true,
          isSubClassEdgeVisible: true,
          isUpperOntologyVisible: true,
          label: 'nodes-filter-graph-2',
          options: {
            nodesFilters: [
              {
                property: 'rdfsLabel',
                value: 'road',
              },
            ],
          },
          type: 'nodes-filter',
        },
      ],
      [
        [
          'currentGraph',
        ],
        'update',
        'graph-2',
      ],
      [
        [
          'lastGraphIndex',
        ],
        'update',
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
