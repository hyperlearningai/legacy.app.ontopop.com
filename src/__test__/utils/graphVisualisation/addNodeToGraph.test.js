import addNodeToGraph from '../../../utils/graphVisualisation/addNodeToGraph'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdgeToGraph from '../../../utils/graphVisualisation/addEdgeToGraph'
import { OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
const visibleEdges = ['12', '24', '33']
const existingEdges = ['100', '333']
const nodeId = '12'
const node = {
  'Business Area': 'Maintain Plan Operate',
  'Data Source': 'Confirm',
  Subdomain: 'Confirm',
  id: '12',
  label: 'Maintenance',
  name: 'Maintenance',
  nodeId: 12,
  nodeType: 'class',
  rdfAbout: 'http://webprotege.stanford.edu/R734t4iI6j8MPmpJsIqO2v4',
  rdfsLabel: 'Maintenance',
  skosDefinition: 'The action taken by an Entity to improve the Condition of, and remedy Defects present on, an Asset.',
  skosExample: 'Road Works',
  upperOntology: false,
  userDefined: false,
}

jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/networkStyling/getElementLabel')
jest.mock('../../../utils/graphVisualisation/addEdgeToGraph')

jest.useFakeTimers()

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  totalEdgesPerNode,
  currentGraph: 'graph-0'
}))

describe('addNodeToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when is last and spidered', async () => {
    await addNodeToGraph({
      updateStoreValue,
      nodeId,
      visibleEdges,
      isLast: true,
      isSpidered: true,
      existingEdges
    })

    expect(addNode).toHaveBeenLastCalledWith({
      node,
      updateStoreValue
    })

    expect(addEdgeToGraph).toHaveBeenLastCalledWith({
      edgeId: '33',
      isLast: true,
      updateStoreValue
    })
    expect(updateStoreValue.mock.calls).toEqual(
      [[['nodesSpiderability', '12'], OPERATION_TYPE_UPDATE,
        'true'], [['graphData',
        'graph-0', 'nodesIds'],
      OPERATION_TYPE_PUSH, '12']]
    )
  })

  it('should work correctly', async () => {
    await addNodeToGraph({
      updateStoreValue,
      nodeId,
      visibleEdges,
      isLast: false,
      isSpidered: false,
      existingEdges
    })

    expect(addNode).toHaveBeenLastCalledWith({
      node,
      updateStoreValue
    })
    expect(updateStoreValue.mock.calls).toEqual(
      [[['nodesSpiderability', '12'], OPERATION_TYPE_UPDATE, 'true']]
    )
    expect(addEdgeToGraph).toHaveBeenCalledTimes(0)
  })
})
