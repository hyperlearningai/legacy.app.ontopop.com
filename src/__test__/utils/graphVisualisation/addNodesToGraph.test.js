import { DataSet } from 'vis-data'
import addNodesToGraph from '../../../utils/graphVisualisation/addNodesToGraph'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import clearNodes from '../../../utils/nodesEdgesUtils/clearNodes'
import clearEdges from '../../../utils/nodesEdgesUtils/clearEdges'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import getElementLabel from '../../../utils/networkStyling/getElementLabel'
import addEdgeToGraph from '../../../utils/graphVisualisation/addEdgeToGraph'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()

const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'

jest.mock('../../../utils/nodesEdgesUtils/clearNodes')
jest.mock('../../../utils/nodesEdgesUtils/clearEdges')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/networkStyling/getElementLabel')
jest.mock('../../../utils/graphVisualisation/addEdgeToGraph')

jest.useFakeTimers()

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)
getElementLabel.mockImplementation(() => 'test')

describe('addNodesToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodesIdsToDisplay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      availableNodes,
      availableEdges,
      totalEdgesPerNode,
      classesFromApi,
      objectPropertiesFromApi,
      nodesIdsToDisplay: [],
      isPhysicsOn: false,
      currentGraph: 'graph-0',
      globalNodeStyling: {
        stylingNodeCaptionProperty,
      },
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty,
      },
    }))

    await addNodesToGraph({
      updateStoreValue,
    })

    expect(updateStoreValue).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      availableNodes,
      availableEdges,
      totalEdgesPerNode,
      classesFromApi,
      objectPropertiesFromApi,
      nodesIdsToDisplay: Object.keys(classesFromApi).slice(0, 10),
      isPhysicsOn: true,
      currentGraph: 'graph-0',
      globalNodeStyling: {
        stylingNodeCaptionProperty,
      },
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty,
      },
    }))

    await addNodesToGraph({
      updateStoreValue,
    })

    const node = {
      'Business Area': 'Finance',
      id: '10',
      label: 'Accrual',
      name: 'Accrual',
      nodeId: 10,
      nodeType: 'class',
      rdfAbout: 'http://webprotege.stanford.edu/R57wpQtXmxYodxNBUKJoHw',
      rdfsLabel: 'Accrual',
      skosDefinition: 'Document containing the period-end accumulated valuation amount for commodities that have floating prices up until the point of the final invoice.',
      upperOntology: false,
      userDefined: false
    }

    expect(clearEdges).toHaveBeenCalledWith()
    expect(clearNodes).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith({
      node,
      updateStoreValue
    })
    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'dataTableTriples',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'dataTableTriplesWithLabels',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'nodesDropdownLabels',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'edgesDropdownLabels',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'availableNodesCount',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'availableEdgesCount',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'graphData',
            'graph-0',
            'nodesIdsToDisplay',
          ],
          OPERATION_TYPE_UPDATE,
          [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
          ],
        ],
        [
          [
            'isPhysicsOn',
          ],
          OPERATION_TYPE_UPDATE,
          false,
        ],
        [
          [
            'activeLoaders',
          ],
          'add',
          1,
        ],
        [
          [
            'nodesSpiderability',
            '1',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '2',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '3',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '4',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '5',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '6',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '7',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '8',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '9',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '10',
          ],
          OPERATION_TYPE_UPDATE,
          'true',
        ],
      ]
    )
    expect(addEdgeToGraph).toHaveBeenLastCalledWith({
      updateStoreValue,
      edgeId: '81',
      isLast: true
    })
  })
})
