import setShortestPath from '../../../utils/shortestPath/setShortestPath'
import { nodesEdges } from '../../fixtures/nodesEdges'
import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'

const updateStoreValue = jest.fn()
const shortestPathNode1 = '33'
const shortestPathNode2 = '40'
const lastGraphIndex = 1

jest.mock('../../../utils/shortestPath/getShortestPath')

store.getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
  nodesEdges,
  shortestPathNode1,
  shortestPathNode2
}))

describe('setShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const isNodeOverlay = false
    const isUpperOntology = true
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
      isUpperOntology
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
