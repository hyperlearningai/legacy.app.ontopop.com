import setNeighbourNodes from '../../../utils/nodeNeighbourhood/setNeighbourNodes'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'

const updateStoreValue = jest.fn()
const selectedNeighbourNode = '1'
const separationDegree = 1
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  selectedNeighbourNode,
  lastGraphIndex,
}))
store.getState = getState

describe('setNeighbourNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setNeighbourNodes({
      separationDegree,
      updateStoreValue,
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
