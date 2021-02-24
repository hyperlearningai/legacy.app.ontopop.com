import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { availableEdges } from '../../fixtures/availableEdges'
import { nodesConnections } from '../../fixtures/nodesConnectionsNew'

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
      nodesConnections: []
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
      nodesConnections
    })

    expect(paths).toEqual([
      '174|||1741|||934|||1843'
    ])
  })

  it('should return 4 paths', async () => {
    const shortestPathSelectedNodes = [
      '191',
      '51'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesConnections
    })

    expect(paths).toEqual([
      '191|||1911|||122',
      '191|||1913|||512',
      '191|||1913|||922',
      '191|||1913|||1894',
    ])
  })
})
