import setBoundingBoxNodes from '../../../utils/boundingBoxSelection/setBoundingBoxNodes'
import store from '../../../store'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../../constants/graph'

const setStoreState = jest.fn()
const addToObject = jest.fn()
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
      setStoreState,
      addToObject
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'currentGraph',
        'graph-2',
      ],
      [
        'lastGraphIndex',
        2,
      ],
      [
        'sidebarView',
        'networkGraphs',
      ],
    ])
    expect(addToObject).toHaveBeenCalledWith(
      'graphData',
      'graph-2', {
        label: 'bounding-box-graph-2',
        options: {
          selectedBoundingBoxNodes: [
            'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          ],
        },
        type: 'bounding-box',
        ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
      }
    )
  })
})
