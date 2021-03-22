import setSearchNeighbourNodes from '../../../utils/graphSearch/setSearchNeighbourNodes'
import store from '../../../store'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../../constants/graph'

const setStoreState = jest.fn()
const addToObject = jest.fn()
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
      setStoreState,
      addToObject,
      searchResult: {
        id: '12',
        type: 'node',
      }
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
        'mainVisualisation',
        'graph',
      ],
      [
        'sidebarView',
        'networkGraphs',
      ],
    ])
    expect(addToObject).toHaveBeenCalledWith(
      'graphData', 'graph-2', {
        label: 'search-graph-2',
        options: {
          selectedEdgesId: [],
          selectedNodesId: ['12'],
          separationDegree: 1
        },
        type: 'search-neighbourhood',
        ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
      }
    )
  })

  it('should work correctly when edge', async () => {
    await setSearchNeighbourNodes({
      separationDegree,
      setStoreState,
      addToObject,
      searchResult: {
        id: '12',
        type: 'edge',
        from: '1',
        to: '111'
      }
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
        'mainVisualisation',
        'graph',
      ],
      [
        'sidebarView',
        'networkGraphs',
      ],
    ])
    expect(addToObject).toHaveBeenCalledWith(
      'graphData', 'graph-2', {
        label: 'search-graph-2',
        options: {
          selectedEdgesId: ['12'],
          selectedNodesId: ['1', '111'],
          separationDegree: 1
        },
        type: 'search-neighbourhood',
        ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
      }
    )
  })
})
