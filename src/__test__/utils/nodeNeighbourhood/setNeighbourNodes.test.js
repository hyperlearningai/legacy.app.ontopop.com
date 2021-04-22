import setNeighbourNodes from '../../../utils/nodeNeighbourhood/setNeighbourNodes'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import setPageView from '../../../utils/analytics/setPageView'
import { ROUTE_NETWORK_GRAPHS } from '../../../constants/routes'

const updateStoreValue = jest.fn()
const pushState = jest.fn()

const selectedElement = { 1: 'node' }
const separationDegree = 1
const lastGraphIndex = 1
let windowSpy

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

jest.mock('../../../utils/analytics/setPageView')

describe('setNeighbourNodes', () => {
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
