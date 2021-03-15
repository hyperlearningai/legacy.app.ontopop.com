import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { availableEdges } from '../../fixtures/availableEdges'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

store.getState = () => ({
  availableEdges,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  }
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

    const nodesToExclude = []
    const edgesToExclude = []

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude
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

    const nodesToExclude = []
    const edgesToExclude = []

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude
    })

    expect(paths).toEqual([
      '191|||1914|||121',
      '191|||1914|||512',
    ])
  })

  it('should return paths when edges to exclude', async () => {
    const shortestPathSelectedNodes = [
      '191',
      '51'
    ]

    const nodesToExclude = []
    const edgesToExclude = ['Monitored by']

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude
    })

    expect(paths).toEqual([
      '191|||1915|||121',
    ])
  })

  it('should return paths when nodes and edges to exclude', async () => {
    const shortestPathSelectedNodes = [
      '191',
      '51'
    ]

    const nodesToExclude = ['12']
    const edgesToExclude = ['Monitored by']

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude
    })

    expect(paths).toEqual([
      '191|||71|||1617|||331',
      '191|||71|||1614|||1765',
      '191|||71|||493|||1124',
      '191|||71|||493|||1783',
      '191|||71|||701|||601',
      '191|||71|||1443|||95',
      '191|||71|||1542|||213',
      '191|||71|||1542|||1891',
      '191|||71|||1924|||512',
      '191|||464|||875|||874',
      '191|||1912|||694|||252',
      '191|||794|||1311|||513',
      '191|||1386|||841|||921',
    ])
  })
})
