import setBoundingBoxNodes from '../../../utils/boundingBoxSelection/setBoundingBoxNodes'
import store from '../../../store'
import setPageView from '../../../utils/analytics/setPageView'
import { ROUTE_NETWORK_GRAPHS } from '../../../constants/routes'

const updateStoreValue = jest.fn()
const pushState = jest.fn()
const lastGraphIndex = 1
let windowSpy

const getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
  selectedBoundingBoxNodes: ['1'],
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
store.getState = getState

jest.mock('../../../utils/analytics/setPageView')

describe('setBoundingBoxNodes', () => {
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

    await setBoundingBoxNodes({
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
          hiddenEdgesProperties: [],
          hiddenNodesProperties: [],
          isDatasetVisible: true,
          isSubClassEdgeVisible: true,
          isUpperOntologyVisible: true,
          label: 'bounding-box-graph-2',
          options: {
            selectedBoundingBoxNodes: [
              '1',
            ],
          },
          type: 'bounding-box',
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
