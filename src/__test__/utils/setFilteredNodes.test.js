import setFilteredNodes from '../../utils/setFilteredNodes'
import store from '../../store'

const setStoreState = jest.fn()
const updateGraphData = jest.fn()
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,

}))
store.getState = getState

describe('setFilteredNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodesFilters = [{
      property: 'rdfsLabel',
      value: 'road'
    }]

    await setFilteredNodes({
      setStoreState,
      nodesFilters,
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
        label: 'nodes-filter-graph-2',
        options: {
          nodesFilters
        },
        type: 'nodes-filter',
      }
    )
  })
})
