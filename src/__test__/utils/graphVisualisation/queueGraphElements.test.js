import { DataSet } from 'vis-data'
import queueGraphElements from '../../../utils/graphVisualisation/queueGraphElements'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()

const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
const nodesIdsToDisplay = [
  '1',
  '170',
  '141'
]

jest.useFakeTimers()

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
      nodesIdsToDisplay,
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

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [['availableNodesCount'], OPERATION_TYPE_UPDATE, 0],
        [['availableEdgesCount'], OPERATION_TYPE_UPDATE, 0],
        [
          [
            'graphData',
            'graph-0',
            'nodesIdsToDisplay',
          ],
          OPERATION_TYPE_UPDATE,
          [
            '1',
            '170',
            '141',
          ],
        ],

        [['isPhysicsOn'], OPERATION_TYPE_UPDATE, false],
        [['activeLoaders'], OPERATION_TYPE_ADD, 1]
      ]
    )
    expect(setTimeout.mock.calls).toEqual([
      [expect.any(Function), 1],
      [expect.any(Function), 1],
      [expect.any(Function), 1]
    ])
  })
})
