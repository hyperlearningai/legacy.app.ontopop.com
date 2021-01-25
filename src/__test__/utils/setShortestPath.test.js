import setShortestPath from '../../utils/setShortestPath'
import { availableEdgesNormalised } from '../fixtures/availableEdgesNormalised'
import { availableNodesNormalised } from '../fixtures/availableNodesNormalised'
import { nodesConnections } from '../fixtures/nodesConnections'
import store from '../../store'

const setStoreState = jest.fn()
const updateGraphData = jest.fn()
const shortestPathSelectedNodes = [
  'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
  'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
]
const lastGraphIndex = 1
const getState = jest.fn().mockImplementation(() => ({
  availableEdgesNormalised,
  availableNodesNormalised,
  lastGraphIndex,
  nodesConnections,
  shortestPathSelectedNodes,
}))
store.getState = getState

describe('setShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const isNodeOverlay = false

    await setShortestPath({
      isNodeOverlay,
      setStoreState,
      updateGraphData,
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
        label: 'shortest-path-graph-2',
        options: {
          isNodeOverlay: false,
          paths: [
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
