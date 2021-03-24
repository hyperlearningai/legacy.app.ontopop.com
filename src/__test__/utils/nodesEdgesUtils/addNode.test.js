import { DataSet } from 'vis-data'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import store from '../../../store'
import { OPERATION_TYPE_ADD } from '../../../constants/store'

const updateStoreValue = jest.fn()

describe('addNode', () => {
  it('should not add node if existing', async () => {
    const availableNodes = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableNodes
    })

    await addNode({
      updateStoreValue,
      node: {
        id: '123'
      }
    })

    expect(availableNodes.length).toEqual(1)
    expect(updateStoreValue).toHaveBeenCalledTimes(0)
  })

  it('should add node correctly', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes
    })

    await addNode({
      updateStoreValue,
      node: {
        id: '123'
      }
    })

    expect(availableNodes.length).toEqual(1)
    expect(updateStoreValue).toHaveBeenCalledWith(['availableNodesCount'], OPERATION_TYPE_ADD, 1)
  })
})
