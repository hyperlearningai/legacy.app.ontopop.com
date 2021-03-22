import setNeighbourNodes from '../../../utils/nodeNeighbourhood/setNeighbourNodes'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../../constants/graph'

const setStoreState = jest.fn()
const addToObject = jest.fn()
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
        label: 'neighbourhood-graph-2',
        options: {
          selectedNodeId: '1',
          separationDegree: 1,
        },
        type: 'neighbourhood',
        ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
      }
    )
  })
})
