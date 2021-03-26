import { DataSet } from 'vis-data'
import removeNode from '../../../utils/nodesEdgesUtils/removeNode'
import store from '../../../store'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
const nodeId = '12'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

const edge = { id: '123' }
getEdge.mockImplementation(() => [edge])

describe('removeNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not remove node if not existing', async () => {
    const availableNodes = new DataSet([])

    store.getState = () => ({
      availableNodes,
    })

    await removeNode({
      nodeId,
      updateStoreValue,
    })

    expect(availableNodes.length).toEqual(0)
    expect(removeEdge).toHaveBeenCalledTimes(0)
  })

  it('should remove node if node exists', async () => {
    const availableNodes = new DataSet([
      {
        id: '12'
      }
    ])
    store.getState = () => ({
      availableNodes,
      nodesDropdownLabels: []
    })

    await removeNode({
      nodeId,
      updateStoreValue,
    })

    expect(availableNodes.length).toEqual(0)
    expect(removeEdge).toHaveBeenCalledWith({
      edge,
      updateStoreValue,
    })
  })

  it('should remove node if node exists and delete from labels', async () => {
    const availableNodes = new DataSet([
      {
        id: '12'
      }
    ])
    store.getState = () => ({
      availableNodes,
      nodesDropdownLabels: [{
        value: '12',
        label: '12'
      }]
    })

    await removeNode({
      nodeId,
      updateStoreValue,
    })

    expect(availableNodes.length).toEqual(0)
    expect(
      updateStoreValue.mock.calls
    ).toEqual(
      [[['availableNodesCount'], OPERATION_TYPE_ADD, -1],
        [['nodesDropdownLabels'], OPERATION_TYPE_UPDATE, []]]
    )
    expect(removeEdge).toHaveBeenCalledWith({
      edge,
      updateStoreValue,
    })
  })
})
