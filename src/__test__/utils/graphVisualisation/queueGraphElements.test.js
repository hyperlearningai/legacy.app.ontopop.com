import { DataSet } from 'vis-data'
import queueGraphElements from '../../../utils/graphVisualisation/queueGraphElements'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import clearEdges from '../../../utils/nodesEdgesUtils/clearEdges'
import clearNodes from '../../../utils/nodesEdgesUtils/clearNodes'

const setStoreState = jest.fn()
const addNumber = jest.fn()

const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
const nodesIdsToDisplay = [
  '1',
  '170',
  '141'
]

jest.mock('../../../utils/nodesEdgesUtils/clearEdges')
jest.mock('../../../utils/nodesEdgesUtils/clearNodes')

jest.useFakeTimers()

describe('queueGraphElements', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodesIdsToDisplay', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      availableNodes,
      availableEdges,
      edgesPerNode,
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
      addNumber
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      availableNodes,
      availableEdges,
      edgesPerNode,
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
      addNumber
    })

    expect(setStoreState.mock.calls).toEqual(
      [
        ['isPhysicsOn', false]
      ]
    )
    expect(clearEdges).toHaveBeenCalledWith()
    expect(clearNodes).toHaveBeenCalledWith()
    expect(addNumber).toHaveBeenCalledWith('activeLoaders', 1)
    expect(setTimeout.mock.calls).toEqual([
      [expect.any(Function), 1],
      [expect.any(Function), 1],
      [expect.any(Function), 1]
    ])
  })
})
