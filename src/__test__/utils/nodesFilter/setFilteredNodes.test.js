import setFilteredNodes from '../../../utils/nodesFilter/setFilteredNodes'
import store from '../../../store'

const updateStoreValue = jest.fn()
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,

}))
store.getState = getState

describe('setFilteredNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
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
          hiddenEdgesProperties: {
            0: {
              properties: {
                0: {
                  operation: 'includes',
                  property: '',
                  value: '',
                },
              },
              type: 'and',
            },
          },
          hiddenNodesProperties: {
            0: {
              properties: {
                0: {
                  operation: 'includes',
                  property: '',
                  value: '',
                },
              },
              type: 'and',
            },
          },
          isDatasetVisible: false,
          isSubClassEdgeVisible: true,
          isUpperOntologyVisible: false,
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
  })
})
