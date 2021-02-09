import setFilteredEdges from '../../../utils/edgesFilter/setFilteredEdges'
import store from '../../../store'

const setStoreState = jest.fn()
const addToObject = jest.fn()
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
        label: 'edges-filter-graph-2',
        options: {
          edgesFilters
        },
        type: 'edges-filter',
      }
    )
  })
})
