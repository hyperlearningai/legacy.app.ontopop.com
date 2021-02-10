import { DataSet } from 'vis-data'
import removeNode from '../../../utils/nodesEdgesUtils/removeNode'
import store from '../../../store'

describe('removeNode', () => {
  it('should not remove node if not existing', async () => {
    const availableNodes = new DataSet([])

    store.getState = () => ({
      availableNodes
    })

    await removeNode('node-123')

    expect(availableNodes.length).toEqual(0)
  })

  it('should remove node if node exists', async () => {
    const availableNodes = new DataSet([
      {
        id: 'node-123'
      }
    ])
    store.getState = () => ({
      availableNodes
    })

    await removeNode('node-123')

    expect(availableNodes.length).toEqual(0)
  })
})
