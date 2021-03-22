/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import addElementToGraph from '../../../utils/graphVisualisation/addElementToGraph'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const toggleFromSubArray = jest.fn()
const toggleFromArrayInKey = jest.fn()
const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
const nodesIdsToDisplay = [
  '1',
  '177',
  '91',
  '191'
]
const nodesEdges = {
  1: [
    '11',
    '12',
    '441',
    '781',
    '811',
    '1421',
    '1781',
    '1855',
    '1921'
  ],
  177: [
    '11',
    '91',
    '275',
    '738',
    '874',
    '1133',
    '1342',
    '1523',
    '1531',
    '1642',
    '1771',
    '1772',
    '1773',
    '1774',
    '1838'
  ],
  91: [
    '911'
  ],
}

jest.mock('../../../utils/graphVisualisation/actionAfterNodesAdded')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')

store.getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  totalEdgesPerNode,
  classesFromApi,
  classesFromApiBackup: classesFromApi,
  objectPropertiesFromApi,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  nodesIdsToDisplay,
  isPhysicsOn: false,
  globalNodeStyling: {
    stylingNodeCaptionProperty,
  },
  userDefinedNodeStyling: {
    stylingNodeCaptionProperty,
  },
  globalEdgeStyling: {
    stylingNodeCaptionProperty,
  },
  userDefinedEdgeStyling: {
    stylingNodeCaptionProperty,
  },
  stylingNodeByProperty: [],
  stylingEdgeByProperty: [],
  highlightedNodes: [],
  highlightedEdges: [],
  nodesEdges
}))

describe('addElementToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when edge not visible', async () => {
    checkEdgeVisibility.mockImplementation(() => false)
    checkNodeVisibility.mockImplementation(() => true)

    const nodeIdsLength = 3
    const i = 2
    const processedEdges = []

    await addElementToGraph({
      classesFromApi,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      totalEdgesPerNode,
      setStoreState,
      addNumber,
      toggleFromSubArray,
      i,
      nodeIdsLength,
      processedEdges,
      toggleFromArrayInKey
    })

    expect(setNodeStyle).toHaveBeenLastCalledWith(
      {
        node: {
          'Business Area': 'Maintain',
          id: '91',
          label: 'Biodiversity',
          name: 'Biodiversity',
          title: 'Biodiversity',
          nodeId: 91,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R9x2FGn2Yb9iaiedpwWEJVo',
          rdfsLabel: 'Biodiversity',
          skosDefinition: 'Variability among living organisms from all sources, including terrestrial, marine, and other aquatic ecosystems and the ecological complexes of which they are part.',
          upperOntology: false,
          userDefined: false,
        },
        skipSpider: true
      }
    )

    expect(actionAfterNodesAdded).toHaveBeenCalledWith({
      setStoreState,
      addNumber,
    })
  })

  it('should work correctly', async () => {
    checkEdgeVisibility.mockImplementation(() => true)
    checkNodeVisibility.mockImplementation(() => true)

    const nodeIdsLength = 3
    const i = 1
    const processedEdges = []

    await addElementToGraph({
      classesFromApi,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      totalEdgesPerNode,
      setStoreState,
      addNumber,
      toggleFromSubArray,
      i,
      nodeIdsLength,
      processedEdges,
      toggleFromArrayInKey
    })

    expect(setNodeStyle).toHaveBeenLastCalledWith(
      {
        node: {
          'Business Area': 'Communications',
          id: '1',
          label: 'Communication\nDocument',
          name: 'Communication Document',
          nodeId: 1,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          rdfsLabel: 'Communication Document',
          title: 'Communication\nDocument',
          skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          skosDefinition: 'Document storing the information conveyed between two or more parties.',
          upperOntology: false,
          userDefined: false,
        },
        skipSpider: true
      }
    )

    expect(actionAfterNodesAdded).toHaveBeenCalledTimes(0)
  })
})
