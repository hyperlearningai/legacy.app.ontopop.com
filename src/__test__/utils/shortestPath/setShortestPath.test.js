import setShortestPath from '../../../utils/shortestPath/setShortestPath'
import { nodesEdges } from '../../fixtures/nodesEdges'
import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'

const setStoreState = jest.fn()
const addToObject = jest.fn()
const shortestPathNode1 = '33'
const shortestPathNode2 = '40'
const lastGraphIndex = 1

jest.mock('../../../utils/shortestPath/getShortestPath')

store.getState = jest.fn().mockImplementation(() => ({
  lastGraphIndex,
  nodesEdges,
  shortestPathNode1,
  shortestPathNode2
}))

describe('setShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const isNodeOverlay = false
    const isUpperOntology = true
    const nodesToExclude = []
    const edgesToExclude = []

    getShortestPath.mockImplementation(() => ([
      '33|||40'
    ]))
    await setShortestPath({
      isNodeOverlay,
      setStoreState,
      addToObject,
      nodesToExclude,
      edgesToExclude,
      isUpperOntology
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
            '33|||40',
          ],
          shortestPathSelectedNodes: [
            '33',
            '40',
          ],
        },
        type: 'shortest-path',
      }
    )
  })
})
