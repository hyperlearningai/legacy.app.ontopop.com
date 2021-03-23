import { DataSet } from 'vis-data'
import queueGraphElements from '../../../utils/graphVisualisation/queueGraphElements'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const toggleFromArrayInKey = jest.fn()
const addSubValueToObject = jest.fn()

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
      setStoreState,
      addNumber,
      toggleFromArrayInKey,
      addSubValueToObject
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)
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
      globalNodeStyling: {
        stylingNodeCaptionProperty,
      },
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty,
      },
    }))

    await queueGraphElements({
      setStoreState,
      addNumber,
      toggleFromArrayInKey,
      addSubValueToObject
    })

    expect(setStoreState.mock.calls).toEqual(
      [
        ['availableNodesCount', 0],
        ['availableEdgesCount', 0],
        ['isPhysicsOn', false]
      ]
    )
    expect(addNumber).toHaveBeenCalledWith('activeLoaders', 1)
    expect(setTimeout.mock.calls).toEqual([
      [expect.any(Function), 1],
      [expect.any(Function), 1],
      [expect.any(Function), 1]
    ])
  })
})
