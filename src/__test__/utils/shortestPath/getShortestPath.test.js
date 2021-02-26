import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { availableEdges } from '../../fixtures/availableEdges'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'

store.getState = () => ({
  availableEdges
})

describe('getShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return no paths', async () => {
    const shortestPathSelectedNodes = [
      '12', '33'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges: []
    })

    expect(paths).toEqual([])
  })

  it('should return 1 path', async () => {
    const shortestPathSelectedNodes = [
      '174',
      '184'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges
    })

    expect(paths).toEqual([
      '174|||1742|||862|||1843'
    ])
  })

  it('should return 2 paths', async () => {
    const shortestPathSelectedNodes = [
      '191',
      '51'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges
    })

    expect(paths).toEqual([
      '191|||1914|||121',
      '191|||1914|||512',
    ])
  })
})
