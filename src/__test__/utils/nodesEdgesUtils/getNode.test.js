import { DataSet } from 'vis-data'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import store from '../../../store'

describe('getNode', () => {
  it('should get node if existing correctly', async () => {
    const availableNodes = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableNodes
    })

    expect(getNode('123')).toEqual({
      id: '123'
    })
  })

  it('should return undefined is not existing', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes
    })

    await getNode({
      id: '234'
    })

    expect(getNode({
      id: '234'
    })).toEqual([])
  })
})
