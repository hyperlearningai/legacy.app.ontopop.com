import { DataSet } from 'vis-data'
import queueGraphElements from '../../../utils/graphVisualisation/queueGraphElements'
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
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import addEdgeToGraph from '../../../utils/graphVisualisation/addEdgeToGraph'

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
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/graphVisualisation/addEdgeToGraph')

jest.useFakeTimers()

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)
getElementLabel.mockImplementation(() => 'test')

describe('queueGraphElements', () => {
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

    await queueGraphElements({
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

    await queueGraphElements({
      updateStoreValue,
    })

    const node = {
      'Business Area': 'Finance',
      id: '10',
      label: 'test',
      name: 'Accrual',
      nodeId: 10,
      nodeType: 'class',
      rdfAbout: 'http://webprotege.stanford.edu/R57wpQtXmxYodxNBUKJoHw',
      rdfsLabel: 'Accrual',
      skosDefinition: 'Document containing the period-end accumulated valuation amount for commodities that have floating prices up until the point of the final invoice.',
      title: 'test',
      upperOntology: false,
      userDefined: false
    }

    expect(clearEdges).toHaveBeenCalledWith()
    expect(clearNodes).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith({
      node,
      updateStoreValue
    })
    expect(setNodeStyle).toHaveBeenLastCalledWith({
      node
    })
    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'availableNodesCount',
          ],
          'update',
          0,
        ],
        [
          [
            'availableEdgesCount',
          ],
          'update',
          0,
        ],
        [
          [
            'graphData',
            'graph-0',
            'nodesIdsToDisplay',
          ],
          'update',
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
          'update',
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
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '2',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '3',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '4',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '5',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '6',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '7',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '8',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '9',
          ],
          'update',
          'true',
        ],
        [
          [
            'nodesSpiderability',
            '10',
          ],
          'update',
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
