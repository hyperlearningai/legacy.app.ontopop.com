import setFilteredEdges from '../../../utils/edgesFilter/setFilteredEdges'
import store from '../../../store'

const updateStoreValue = jest.fn()
const lastGraphIndex = 1

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

describe('setFilteredEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edgesFilters = [{
      property: 'rdfsLabel',
      value: 'road'
    }]

    await setFilteredEdges({
      updateStoreValue,
      edgesFilters,
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
          label: 'edges-filter-graph-2',
          options: {
            edgesFilters: [
              {
                property: 'rdfsLabel',
                value: 'road',
              },
            ],
          },
          type: 'edges-filter',
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
