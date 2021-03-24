import setSearchNeighbourNodes from '../../../utils/graphSearch/setSearchNeighbourNodes'
import store from '../../../store'

const updateStoreValue = jest.fn()
const separationDegree = 1
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
}))
store.getState = getState

describe('setSearchNeighbourNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node', async () => {
    await setSearchNeighbourNodes({
      separationDegree,
      updateStoreValue,
      searchResult: {
        id: '12',
        type: 'node',
      }
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
          label: 'search-graph-2',
          options: {
            selectedEdgesId: [],
            selectedNodesId: [
              '12',
            ],
            separationDegree: 1,
          },
          type: 'search-neighbourhood',
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
          'mainVisualisation',
        ],
        'update',
        'graph',
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

  it('should work correctly when edge', async () => {
    await setSearchNeighbourNodes({
      separationDegree,
      updateStoreValue,
      searchResult: {
        id: '12',
        type: 'edge',
        from: '1',
        to: '111'
      }
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
          label: 'search-graph-2',
          options: {
            selectedEdgesId: [
              '12',
            ],
            selectedNodesId: [
              '1',
              '111',
            ],
            separationDegree: 1,
          },
          type: 'search-neighbourhood',
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
          'mainVisualisation',
        ],
        'update',
        'graph',
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
