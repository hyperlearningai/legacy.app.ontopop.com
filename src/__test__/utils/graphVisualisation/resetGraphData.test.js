import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import store from '../../../store'
import resetGraphData from '../../../utils/graphVisualisation/resetGraphData'
import clearEdges from '../../../utils/nodesEdgesUtils/clearEdges'
import clearNodes from '../../../utils/nodesEdgesUtils/clearNodes'

const updateStoreValue = jest.fn()
jest.mock('../../../utils/nodesEdgesUtils/clearEdges')
jest.mock('../../../utils/nodesEdgesUtils/clearNodes')

describe('resetGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      currentPhysicsOnState: true,
    }))

    await resetGraphData({
      updateStoreValue
    })

    expect(clearEdges).toHaveBeenCalledWith()
    expect(clearNodes).toHaveBeenCalledWith()
    expect(updateStoreValue.mock.calls).toEqual([
      [['isPhysicsOn'], OPERATION_TYPE_UPDATE, false],
      [['classesFromApi'], OPERATION_TYPE_UPDATE, {}],
      [['objectPropertiesFromApi'], OPERATION_TYPE_UPDATE, {}],
      [['classesFromApiBackup'], OPERATION_TYPE_UPDATE, {}],
      [['objectPropertiesFromApiBackup'], OPERATION_TYPE_UPDATE, {}],
      [['deletedNodes'], OPERATION_TYPE_UPDATE, []],
      [['addedNodes'], OPERATION_TYPE_UPDATE, []],
      [['updatedNodes'], OPERATION_TYPE_UPDATE, []],
      [['deletedEdges'], OPERATION_TYPE_UPDATE, []],
      [['addedEdges'], OPERATION_TYPE_UPDATE, []],
      [['updatedEdges'], OPERATION_TYPE_UPDATE, []],
      [['addedEdges'], OPERATION_TYPE_UPDATE, []],
      [['deletedEdges'], OPERATION_TYPE_UPDATE, []]
    ])
  })
})
