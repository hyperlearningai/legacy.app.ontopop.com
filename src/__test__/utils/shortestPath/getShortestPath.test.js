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
      '174|||1741|||906|||1841'
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
      '191|||1913|||3999|||4040',
    ])
  })

  it('should return paths when nodes and edges to exclude', async () => {
    const shortestPathSelectedNodes = [
      '191',
      '51'
    ]

    const nodesToExclude = ['12']
    const edgesToExclude = ['Found in']

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude
    })

    expect(paths).toEqual([
      '191|||1912|||1503|||183|||1001|||511',
      '191|||1913|||903|||601|||602|||513',
    ])
  })
})
