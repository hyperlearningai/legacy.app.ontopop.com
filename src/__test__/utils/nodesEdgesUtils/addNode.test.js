import { DataSet } from 'vis-data'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import store from '../../../store'

describe('addNode', () => {
  it('should not add node if existing correctly', async () => {
    const availableNodes = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableNodes
    })

    await addNode({
      id: '123'
    })

    expect(availableNodes.length).toEqual(1)
  })

  it('should add node correctly', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes
    })

    await addNode({
      id: '123'
    })

    expect(availableNodes.length).toEqual(1)
  })
})
