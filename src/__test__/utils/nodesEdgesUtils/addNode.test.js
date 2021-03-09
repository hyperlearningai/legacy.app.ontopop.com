import { DataSet } from 'vis-data'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import store from '../../../store'

const addNumber = jest.fn()

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
      addNumber,
      node: {
        id: '123'
      }
    })

    expect(availableNodes.length).toEqual(1)
    expect(addNumber).toHaveBeenCalledTimes(0)
  })

  it('should add node correctly', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes
    })

    await addNode({
      addNumber,
      node: {
        id: '123'
      }
    })

    expect(availableNodes.length).toEqual(1)
    expect(addNumber).toHaveBeenCalledWith('availableNodesCount', 1)
  })
})
