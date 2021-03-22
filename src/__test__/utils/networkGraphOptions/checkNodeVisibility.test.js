import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import store from '../../../store'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'
import { classesFromApi } from '../../fixtures/classesFromApi'

const currentGraph = 'graph-0'
const commonState = {
  currentGraph,
  classesFromApiBackup: classesFromApi,
}

const toggleFromSubArray = jest.fn()

describe('checkNodeVisibility', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly if upper ontology not visible and is upper ontology', async () => {
    const nodeId = '65'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUpperOntologyVisible: false,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {}
        }
      },
    }))

    const output = await checkNodeVisibility({
      nodeId,
      toggleFromSubArray
    })

    expect(toggleFromSubArray).toHaveBeenCalledWith(
      'graphData',
      currentGraph,
      'hiddenNodes',
      nodeId
    )
    expect(output).toEqual(false)
  })

  it('should work correctly if upper ontology not visible and is not upper ontology', async () => {
    const nodeId = '12'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUpperOntologyVisible: false,
          isSubClassEdgeVisible: true,
          isDatasetVisible: true,
          hiddenNodesProperties: {}
        }
      },
    }))

    const output = await checkNodeVisibility({
      nodeId,
      toggleFromSubArray
    })

    expect(toggleFromSubArray).toHaveBeenCalledTimes(0)
    expect(output).toEqual(true)
  })

  it('should work correctly if dataset not visible and is dataset', async () => {
    const nodeId = '1813'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: false,
          hiddenNodesProperties: {}
        }
      },
    }))

    const output = await checkNodeVisibility({
      nodeId,
      toggleFromSubArray
    })

    expect(toggleFromSubArray).toHaveBeenCalledWith(
      'graphData',
      currentGraph,
      'hiddenNodes',
      nodeId
    )
    expect(output).toEqual(false)
  })

  it('should work correctly if dataset visible and hiddenNodesProperties', async () => {
    const nodeId = '1813'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
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

    const output = await checkNodeVisibility({
      nodeId,
      toggleFromSubArray
    })

    expect(toggleFromSubArray).toHaveBeenCalledWith(
      'graphData',
      currentGraph,
      'hiddenNodes',
      nodeId
    )
    expect(output).toEqual(false)
  })

  it('should work correctly if dataset not visible and is not dataset', async () => {
    const nodeId = '12'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: false,
          hiddenNodesProperties: {}
        }
      },
    }))

    const output = await checkNodeVisibility({
      nodeId,
      toggleFromSubArray
    })

    expect(toggleFromSubArray).toHaveBeenCalledTimes(0)
    expect(output).toEqual(true)
  })

  it('should work correctly if all visible', async () => {
    const nodeId = '12'

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      graphData: {
        'graph-0': {
          label: 'Main',
          noDelete: true,
          type: ALGO_TYPE_FULL,
          isUpperOntologyVisible: true,
          isSubClassEdgeVisible: true,
          isDatasetVisible: false,
          hiddenNodesProperties: {}
        }
      },
    }))

    const output = await checkNodeVisibility({
      nodeId,
      toggleFromSubArray
    })

    expect(toggleFromSubArray).toHaveBeenCalledTimes(0)
    expect(output).toEqual(true)
  })
})
