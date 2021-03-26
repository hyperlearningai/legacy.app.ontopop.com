import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { availableEdges } from '../../fixtures/availableEdges'
import { nodesEdges } from '../../fixtures/nodesEdges'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { classesFromApi } from '../../fixtures/classesFromApi'

const commonState = {
  availableEdges,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  classesFromApi
}

describe('getShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return no paths', async () => {
    const shortestPathSelectedNodes = [
      '12', '33'
    ]

    store.getState = () => ({
      ...commonState,
      nodesEdges: [],
    })

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesToExclude: [],
      edgesToExclude: [],
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

    store.getState = () => ({
      ...commonState,
      nodesEdges
    })

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesToExclude,
      edgesToExclude,
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

    store.getState = () => ({
      ...commonState,
      nodesEdges
    })

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesToExclude,
      edgesToExclude,
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

    store.getState = () => ({
      ...commonState,
      nodesEdges
    })

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesToExclude,
      edgesToExclude,
    })

    expect(paths).toEqual([
      '191|||1912|||1503|||183|||1001|||511',
      '191|||1913|||903|||601|||602|||513',
    ])
  })
})
