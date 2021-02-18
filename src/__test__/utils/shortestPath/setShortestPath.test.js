import setShortestPath from '../../../utils/shortestPath/setShortestPath'
import { nodesConnections } from '../../fixtures/nodesConnections'
import store from '../../../store'

const setStoreState = jest.fn()
const addToObject = jest.fn()
const shortestPathNode1 = 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV'
const shortestPathNode2 = 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
const lastGraphIndex = 1

store.getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
  nodesConnections,
  shortestPathNode1,
  shortestPathNode2
}))

describe('setShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const isNodeOverlay = false

    await setShortestPath({
      isNodeOverlay,
      setStoreState,
      addToObject,
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
        label: 'shortest-path-graph-2',
        options: {
          isNodeOverlay: false,
          shortestPathResults: [
            'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV|||http://webprotege.stanford.edu/R8fzvBl85R2Nc2SqsikiKp9___http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV___http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'],
          shortestPathSelectedNodes: [
            'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
            'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
          ]
        },
        type: 'shortest-path'
      }
    )
  })
})
