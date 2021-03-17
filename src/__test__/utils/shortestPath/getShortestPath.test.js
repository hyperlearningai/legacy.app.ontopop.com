import store from '../../../store'
import getShortestPath from '../../../utils/shortestPath/getShortestPath'
import { availableEdges } from '../../fixtures/availableEdges'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { classesFromApi } from '../../fixtures/classesFromApi'

store.getState = () => ({
  availableEdges,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  classesFromApi
})

describe('getShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return no paths', async () => {
    const shortestPathSelectedNodes = [
      '12', '33'
    ]
    const isUpperOntology = true

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges: [],
      nodesToExclude: [],
      edgesToExclude: [],
      isUpperOntology
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
    const isUpperOntology = true

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude,
      isUpperOntology
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
    const isUpperOntology = true

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude,
      isUpperOntology
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
    const isUpperOntology = true

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude,
      isUpperOntology
    })

    expect(paths).toEqual([
      '191|||1912|||1503|||183|||1001|||511',
      '191|||1913|||903|||601|||602|||513',
    ])
  })

  it('should return paths when isUpperOntology is false', async () => {
    const shortestPathSelectedNodes = [
      '41',
      '143'
    ]

    const nodesToExclude = []
    const edgesToExclude = []
    const isUpperOntology = false

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude,
      isUpperOntology
    })

    expect(paths).toEqual([
      '41|||417|||1341',
    ])
  })

  it('should return paths when isUpperOntology is true', async () => {
    const shortestPathSelectedNodes = [
      '41',
      '143'
    ]

    const nodesToExclude = []
    const edgesToExclude = []
    const isUpperOntology = true

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesEdges,
      nodesToExclude,
      edgesToExclude,
      isUpperOntology
    })

    expect(paths).toEqual([
      '41|||416|||1431',
      '41|||417|||1341',
    ])
  })
})
