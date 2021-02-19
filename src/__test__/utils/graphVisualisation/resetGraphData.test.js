import store from '../../../store'
import resetGraphData from '../../../utils/graphVisualisation/resetGraphData'
import clearEdges from '../../../utils/nodesEdgesUtils/clearEdges'
import clearNodes from '../../../utils/nodesEdgesUtils/clearNodes'

const setStoreState = jest.fn()
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
      setStoreState
    })

    expect(clearEdges).toHaveBeenCalledWith()
    expect(clearNodes).toHaveBeenCalledWith()
    expect(setStoreState.mock.calls).toEqual([
      ['isPhysicsOn', false],
      ['classesFromApi', {}],
      ['objectPropertiesFromApi', {}],
      ['classesFromApiBackup', {}],
      ['objectPropertiesFromApiBackup', {}],
      ['deletedNodes', []],
      ['addedNodes', []],
      ['updatedNodes', []],
      ['deletedEdges', []],
      ['addedEdges', []],
      ['updatedEdges', []],
      ['addedConnections', []],
      ['deletedConnections', []]
    ])
  })
})
