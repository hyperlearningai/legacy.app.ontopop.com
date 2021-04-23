import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import store from '../../../store'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'

const currentGraph = 'graph-0'
const commonState = {
  currentGraph,
  totalEdgesPerNode: {
    ...totalEdgesPerNode,
    65431: undefined
  },
  classesFromApiBackup: {
    ...classesFromApi,
    65430: {
      userDefined: true
    }
  },
  highlightedNodes: ['65']
}

describe('checkNodeVisibility', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly if user defined', () => {
    const nodeId = '65430'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: false,
          isOrphanNodeVisible: false,
          isUpperOntologyVisible: false,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(false)
  })

  it('should work correctly if orphan node', () => {
    const nodeId = '65431'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: false,
          isUpperOntologyVisible: false,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(false)
  })

  it('should work correctly if upper ontology not visible and is upper ontology', () => {
    const nodeId = '65'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: true,
          isUpperOntologyVisible: false,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(false)
  })

  it('should work correctly if upper ontology not visible and is not upper ontology', () => {
    const nodeId = '12'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: true,
          isUpperOntologyVisible: false,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(true)
  })

  it('should work correctly if dataset not visible and is dataset', () => {
    const nodeId = '1813'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: true,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: false,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(false)
  })

  it('should work correctly if dataset visible and hiddenNodesProperties', () => {
    const nodeId = '1813'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: true,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {
            0: {
              type: 'and',
              properties: {
                0: {
                  operation: 'equal',
                  value: 'test',
                  property: 'rdfsLabel'
                }
              }
            }
          }
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(false)
  })

  it('should work correctly if dataset not visible and is not dataset', () => {
    const nodeId = '12'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: true,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: false,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(true)
  })

  it('should work correctly if all visible', () => {
    const nodeId = '12'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUserDefinedNodeVisible: true,
          isOrphanNodeVisible: true,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: false,
          hiddenNodesProperties: {}
        }
      },
    }))

    expect(checkNodeVisibility({
      nodeId
    })).toEqual(true)
  })
})
