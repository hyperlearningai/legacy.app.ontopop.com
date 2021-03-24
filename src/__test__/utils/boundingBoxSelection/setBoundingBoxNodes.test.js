import setBoundingBoxNodes from '../../../utils/boundingBoxSelection/setBoundingBoxNodes'
import store from '../../../store'

const updateStoreValue = jest.fn()
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
  selectedBoundingBoxNodes: ['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY']
}))
store.getState = getState

describe('setBoundingBoxNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
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
          label: 'bounding-box-graph-2',
          options: {
            selectedBoundingBoxNodes: [
              'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
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
  })
})
