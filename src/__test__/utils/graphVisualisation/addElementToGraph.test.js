/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import addElementToGraph from '../../../utils/graphVisualisation/addElementToGraph'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import addNodesEdges from '../../../utils/graphVisualisation/addNodesEdges'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const fit = jest.fn()
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
jest.mock('../../../utils/graphVisualisation/addNodesEdges')

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
          'Business Area': 'Operate Design Construct Plan Maintain',
          id: '191',
          label: 'Environmental\nCondition',
          name: 'Environmental Condition',
          nodeId: 191,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/RmVBgJPMOQ5Amchla0VZUw',
          rdfsLabel: 'Environmental Condition',
          skosDefinition: 'A measure of how the environment proximate to the Network is developing or declining.',
          upperOntology: false,
          userDefined: false,
        },
        skipSpider: true
      }
    )
    expect(addNodesEdges).toHaveBeenLastCalledWith(
      {
        edge: {
          edgeId: 911,
          from: '91',
          id: '911',
          label: '',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '191',
          userDefined: false
        },
        nodesEdges: {
          1: ['11', '12', '441',
            '781', '811', '1421', '1781', '1855', '1921'],
          177: ['11', '91', '275', '738', '874',
            '1133', '1342', '1523', '1531', '1642', '1771', '1772', '1773', '1774', '1838'],
          91: ['911']
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
