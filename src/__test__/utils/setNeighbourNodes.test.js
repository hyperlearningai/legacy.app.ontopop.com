import setNeighbourNodes from '../../utils/setNeighbourNodes'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { triplesPerNode } from '../fixtures/triplesPerNode'
import store from '../../store'

const setStoreState = jest.fn()
const addToObject = jest.fn()
const classesFromApi = OwlClasses
const selectedNeighbourNode = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
const separationDegree = 1
const lastGraphIndex = 1

const getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  selectedNeighbourNode,
  lastGraphIndex,
  triplesPerNode,
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
          selectedNodeId: undefined,
          separationDegree: 1,
          triplesPerNode
        },
        type: 'neighbourhood'
      }
    )
  })
})
