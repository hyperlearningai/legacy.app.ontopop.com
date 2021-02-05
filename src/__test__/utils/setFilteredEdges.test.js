import setFilteredEdges from '../../utils/setFilteredEdges'
import store from '../../store'

const setStoreState = jest.fn()
const updateGraphData = jest.fn()
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,

}))
store.getState = getState

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
      setStoreState,
      edgesFilters,
      updateGraphData
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
    expect(updateGraphData).toHaveBeenCalledWith(
      'graph-2', {
        label: 'edges-filter-graph-2',
        options: {
          edgesFilters
        },
        type: 'edges-filter',
      }
    )
  })
})
