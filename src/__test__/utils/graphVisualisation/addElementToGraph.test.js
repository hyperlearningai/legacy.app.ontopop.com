import { DataSet } from 'vis-data'
import addElementToGraph from '../../../utils/graphVisualisation/addElementToGraph'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const fit = jest.fn()
const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
const nodesIdsToDisplay = [
  '1',
  '170',
  '141'
]
const nodesEdges = {
  1: [
    '11',
    '12',
  ],
  141: [
    '11',
  ],
  170: [
    '12',
  ],
}

jest.mock('../../../utils/graphVisualisation/actionAfterNodesAdded')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkStyling/setEdgeStyle')

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

  it('should work correctly', async () => {
    await addElementToGraph({
      classesFromApi,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      totalEdgesPerNode,

      setStoreState,
      addNumber,
      i: 2,
      nodeIdsLength: 3,
      processedEdges: [],
      nodesEdges,
      currentPhysicsOnState: false,
      network: {
        fit
      }
    })

    expect(setNodeStyle).toHaveBeenLastCalledWith(
      {
        node: {
          'Business Area': 'Communications',
          id: '1',
          label: 'Communication\nDocument',
          nodeId: 1,
          rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          rdfsLabel: 'Communication Document',
          skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          skosDefinition: 'Document storing the information conveyed between two or more parties.',
          userDefined: false
        },
        skipSpider: true
      }
    )
    expect(setEdgeStyle).toHaveBeenLastCalledWith(
      {
        edge: {
          edgeId: 11,
          from: '1',
          id: '11',
          label: '',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '141',
          userDefined: false
        }
      }
    )

    expect(actionAfterNodesAdded).toHaveBeenCalledWith({
      setStoreState,
      addNumber,
      nodesEdges,
    })
  })
})
